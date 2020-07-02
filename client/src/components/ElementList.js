import React, { useContext } from 'react'
import { List, Icon, Badge } from 'rsuite'
import Radium from 'radium'
import { context } from '../context/context'
import PopoverDelPrivChat from './PopoverDelPrivChat'
import PopoverDelChat from './PopoverDelChat'
import PopoverDelUser from './PopoverDelUser'

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
  noimg: { fontSize: '3.3rem', },
  content: {
    flex: '1 1 auto',
    margin: '0 0 0 0.4rem',
    flexFlow: 'column nowrap',
    overflow: 'hidden',
  },
  name: { fontSize: '1.2rem', lineHeight: '2rem', },
  description: { fontSize: '0.8rem', },
  elipsis: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', }, 
  select: { background: '#0052a2', },
  noselect: { background: 'dodgerblue', },
  icon: { margin: '0 0.2rem',  },
  wrap: { flex: '1 0 auto', alignItems: 'flex-end', flexFlow: 'column nowrap', height: '4rem',}
}

function ElementList({ data, style, multi, selected, setSelected}) {
  const { credentials, itemIndex, setItemIndex } = useContext(context)

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
                : <Badge content={false}><Icon icon="image" style={styles.noimg} /></Badge>
              }
            </div>

            <div style={{...styles.content, ...styles.flex}} >
              <div style={{...styles.name, ...styles.elipsis}} >{item.name ? item.name : item.login}</div>
              <div style={{...styles.description, ...styles.elipsis}} >{item.description}</div>
            </div>
            <div style={{...styles.wrap, ...styles.flex}}>
              <div>
                { item.private === true && itemIndex !== undefined && 
                  selected[index] &&
                    <PopoverDelPrivChat placement="rightStart" content={item.name} item={item._id} />
                }
                { item.private === false && itemIndex !== undefined && 
                  selected[index] && item.owner !== credentials.userId &&
                    <PopoverDelChat placement="rightStart" content={item.name} item={item._id} />
                }
                { item.login && itemIndex !== undefined && 
                  selected[index] &&
                    <PopoverDelUser placement="rightStart" content={item.login} item={item._id} />
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