import React, { useContext } from 'react'
import { List, Icon, Badge, Whisper, Popover, Button } from 'rsuite'
import Radium from 'radium'
import { context } from '../context/context'

const styles = {
  flex: { display: 'flex', justifyContent: 'space-between', },
  element: {
    height: '4rem',
    alignItems: 'center',
    margin: '0.2rem',
    padding: '0 0.3rem',
    color: 'black',
    opacity: '0.8',
    ':hover': {
      opacity: '1',
      cursor: 'pointer',
      color: 'white',
    }
  },
  img: { height: '3.5rem' },
  content: {
    flex: '1 1 auto',
    height: '4rem',
    margin: '0 0 0 0.4rem',
    flexFlow: 'column nowrap',
    alignItems: 'flex-start',
  },
  name: { flex: '0 0 2rem', fontSize: '1rem', lineHeight: '2rem', },
  description: { flex: '1 0 2rem', fontSize: '0.8rem', width: '8rem',},
  elipsis: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', }, 
  select: { background: '#0052a2', },
  noselect: { background: 'dodgerblue', },
  icon: { margin: '0 0.2rem',  },
  wrap: { flex: '1 0 auto', alignItems: 'flex-end', flexFlow: 'column nowrap', height: '4rem',}
}

const speaker = (
  <Popover title="Remove this room">
    <p>Do You want to delete </p>
    <p>this chatroom?...</p>
    <Button>OK</Button>
  </Popover>
)

function ElementList({ data, style, multi, selected, setSelected}) {
  const { credentials, items, itemIndex, setItemIndex } = useContext(context)

  const handlerOnClick = (item, index) => {
    let obj = {...selected}
    if (multi === 'true') {
      if (obj[index]) {
        delete obj[index]
        setSelected(obj)
      } else {
        setSelected({...obj, [index]: item._id})
      }
    } else {
     setSelected({[index]: item._id})
     setItemIndex(index)
    }
  }
  // console.log('element list data ...', data, data.length, itemIndex)
  return (
    <List style={style}>
      { data &&
        data.map((item, index) => 
          <section style={selected[index] 
                          ? {...styles.select, ...styles.element, ...styles.flex} 
                          : {...styles.noselect, ...styles.element, ...styles.flex}} 
                          onClick={() => handlerOnClick(item, index)} key={index}>
            <div>
              { item.avatar
                ? <Badge content={false}><img src={item.avatar} style={styles.img} /></Badge>
                : <Badge content={false}><Icon icon="image" size="4x" /></Badge>
              }
            </div>

            <div style={{...styles.content, ...styles.flex}} >
              <div style={{...styles.name, ...styles.elipsis}} >{item.name ? item.name : item.login}</div>
              <div style={{...styles.description, ...styles.elipsis}} >{item.description}</div>
            </div>
            <div style={{...styles.wrap, ...styles.flex}}>
              <div>
                { item.private === true && itemIndex !== undefined && selected[index] &&
                    <Whisper  placement="rightStart" trigger="active" 
                              speaker={speaker} enterable>
                      <Icon icon="close" size="1x" style={styles.icon} /> 
                    </Whisper>
                }
              </div>
              <div>
                { item.owner === credentials.userId &&
                    <Icon icon="avatar" size="1x" style={styles.icon} />
                }
                { item.private === true && 
                    <Icon icon="lock" size="1x" style={styles.icon} />
                }
              </div>
            </div>
          </section>
        )}
    </List>
  )
}

export default Radium(ElementList)