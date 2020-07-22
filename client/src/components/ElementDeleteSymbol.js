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
          <PopoverDelPrivChat placement="rightStart" item={item} setSelected={setSelected} />
      }
      { item.private === false && itemIndex !== undefined && 
        selected[index] && item.owner !== credentials.userId &&
          <PopoverDelChat placement="rightStart" item={item} setSelected={setSelected} />
      }
      { item.login && itemIndex !== undefined && 
        selected[index] &&
          <PopoverDelUser placement="rightStart" item={item} setSelected={setSelected} />
      }
    </div>
  )
}