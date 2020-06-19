import React from 'react'
import { List, Icon } from 'rsuite'
import { useHover } from '../hooks/hover.hook'

const styles = {
  element: {
    height: '4rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0.2rem',
    background: 'dodgerblue',
    color: 'white',
    opacity: '0.8',
  },
  helement: {
    height: '4rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0.2rem',
    background: 'dodgerblue',
    color: 'white',
    opacity: '1',
    cursor: 'pointer',
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
  list: { height: '100%' }
}


export default function ElementCard({data}) {
  const { hover, ...hoverProps } = useHover()
  // console.log('hover', hover)
  return (
    <List style={styles.list} >
      {data.map((item, index) => (
          <section style={hover ? styles.helement : styles.element } {...hoverProps} >
            <div style={styles.img} >
              { item.avatar
                ? <img src={item.avatar} />
                : <Icon icon="image" size="4x" />
              }
            </div>

            <div style={styles.content} >
              <div style={styles.name} >{item.name}</div>
              <div style={styles.description} >{item.description}</div>
            </div>
          </section>
      ))}
    </List>
  )
}