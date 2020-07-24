import React from 'react'
import { Icon } from 'rsuite'

const styles = {
  flex: { display: 'flex', justifyContent: 'space-between', },
  content: {
    flex: '1 1 auto',
    margin: '0 0 0 0.4rem',
    flexFlow: 'column nowrap',
    overflow: 'hidden',
  },
  name: { fontSize: '1.2rem', lineHeight: '2rem', },
  description: { fontSize: '0.8rem', },
  elipsis: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', }, 
  noselect: { background: '#abd6ff', margin: '0.2rem', },
  img: { height: '3.5rem', padding: '0.2rem',},
  noimg: { fontSize: '3.3rem', width: '3.5rem', textAlign: 'center', padding: '0.2rem',},
}

export default function NotificationsElement(props) {
  const { item, index } = props

  return (
    <section style={{...styles.noselect, ...styles.flex}} key={index} >

      {item.avatar
              // if user has "avatar" then show image
            ? <img src={item.avatar} alt='' style={styles.img} />
              // if user has no "avatar" then show icon
            : <Icon style={styles.noimg} icon="user-o" />
      }

      <div style={{...styles.content, ...styles.flex}} >
        <div style={{...styles.name, ...styles.elipsis}} >{item.login}</div>
        <div style={{...styles.description, ...styles.elipsis}} >{item.description}</div>
      </div>

    </section>
  )
}