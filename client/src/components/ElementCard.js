import React from 'react'
import { List, Icon } from 'rsuite'

const styles = {
  element: {
    height: '4rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0.2rem',
    background: 'dodgerblue',
    color: 'white',
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
  return (
    <List hover style={styles.list}>
      {data.map((item, index) => (
          <section style={styles.element}>
            <div style={styles.img} >
              { item.avatar
                ? <img src={item.avatar} />
                : <Icon icon="image" size="4x" />
              }
            </div>

            <div style={styles.content} >
              <div style={styles.name} >{item['name']}</div>
              <div style={styles.description} >{item['description']}</div>
            </div>
          </section>
      ))}
    </List>
  )
}