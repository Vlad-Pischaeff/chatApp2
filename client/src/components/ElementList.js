import React from 'react'
import { List } from 'rsuite'
import Element from './Element'

export default function ElementList(props) {
  const { data, style, ...arr } = props

  return (
    <List style={style}>
      { data &&  
          data.map((item, index) => 
            <Element item={item} index={index} {...arr} key={index} />
          )
      }
    </List>
  )
}