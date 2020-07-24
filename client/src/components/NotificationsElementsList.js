import React from 'react'
import { List } from 'rsuite'
import NotificationsElement from './NotificationsElement'

const styles = { list: { overflow: 'hidden', }, }

export default function NotificationsElementsList(props) {
  const { data } = props

  return (
    <List style={styles.list}>
      { data &&  
          data.map((item, index) => 
            <NotificationsElement item={item} index={index} key={index} />
          )
      }
    </List>
  )
}