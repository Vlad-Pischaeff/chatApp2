import React, { useContext } from 'react'
import { context } from '../context/context'
import PopoverDelPrivChat from './PopoverDelPrivChat'
import PopoverDelChat from './PopoverDelChat'
import PopoverDelUser from './PopoverDelUser'

export default function ElementDeleteSymbol(props) {
  const { item, index, selected, setSelected } = props
  const { credentials, itemIndex } = useContext(context)

  return (
    <div>
      { item.private === true && itemIndex !== undefined && 
        selected[index] && item.owner === credentials.userId &&
          <PopoverDelPrivChat placement="rightStart" content={item.name} item={item._id} setSelected={setSelected} />
      }
      { item.private === false && itemIndex !== undefined && 
        selected[index] && item.owner !== credentials.userId &&
          <PopoverDelChat placement="rightStart" content={item.name} item={item._id} setSelected={setSelected} />
      }
      { item.login && itemIndex !== undefined && 
        selected[index] &&
          <PopoverDelUser placement="rightStart" content={item.login} item={item._id} setSelected={setSelected} />
      }
    </div>
  )
}