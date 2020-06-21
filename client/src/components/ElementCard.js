import React from 'react'
import { Icon, Badge } from 'rsuite'
import Radium from 'radium'

const styles = {
  element: {
    height: '4rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0.2rem',
    background: 'dodgerblue',
    color: 'black',
    opacity: '0.6',
    ':hover': {
      opacity: '1',
      cursor: 'pointer',
      color: 'white',
    }
  },
  img: { flex: '0 0 4rem' },
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
}


function ElementCard({key, item}) {

  return (
    <section style={styles.element} key={key} >
      <div style={styles.img} >
        { item.avatar
          ? <Badge><img src={item.avatar} /></Badge>
          : <Badge><Icon icon="image" size="4x" /></Badge>
        }
      </div>

      <div style={styles.content} >
        <div style={styles.name} >{item.name}</div>
        <div style={styles.description} >{item.description}</div>
      </div>
    </section>
  )
}
ElementCard = Radium(ElementCard)

export default ElementCard