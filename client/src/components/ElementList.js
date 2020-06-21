import React from 'react'
import { List } from 'rsuite'
import ElementCard from './ElementCard'

export default function ElementList({data, style}) {

  return (
    <List style={style} >
      {data.map((item, index) => <ElementCard key={index} item={item} />)}
    </List>
  )
}
