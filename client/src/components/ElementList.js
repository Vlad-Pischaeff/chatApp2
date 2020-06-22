import React, { useState } from 'react'
import { List, Icon, Badge } from 'rsuite'
import Radium from 'radium'

const styles = {
  element: {
    height: '4rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0.2rem',
    padding: '0 0.3rem',
    color: 'black',
    opacity: '0.6',
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
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: { flex: '0 0 1rem', fontSize: '1.1rem' },
  description: { flex: '1 0 3rem', fontSize: '0.9rem' },
  select: { background: '#0052a2', },
  noselect: { background: 'dodgerblue', },
}

function ElementList({data, style, multi}) {
  const [selected, setSelected] = useState({})

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
    }
  }

  console.log('selected ...', selected, multi)

  return (
    <List style={style}>
      {data.map((item, index) => 
        <section style={selected[index] 
                        ? {...styles.select, ...styles.element} 
                        : {...styles.noselect, ...styles.element}} 
                        onClick={() => handlerOnClick(item, index)} key={index}>
          <div>
            { item.avatar
              ? <Badge><img src={item.avatar} style={styles.img} /></Badge>
              : <Badge><Icon icon="image" size="4x" /></Badge>
            }
          </div>

          <div style={styles.content} >
            <div style={styles.name} >{item.name ? item.name : item.login}</div>
            <div style={styles.description} >{item.description}</div>
          </div>
        </section>
        )}
    </List>
  )
}

export default Radium(ElementList)