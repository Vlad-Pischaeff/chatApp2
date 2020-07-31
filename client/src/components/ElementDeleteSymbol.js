import React, { useContext } from 'react'
import { context, useGlobalCredentialsContext } from '../context/context'
import PopoverDelPrivChat from './PopoverDelPrivChat'
import PopoverUnsubscribeChat from './PopoverUnsubscribeChat'
import PopoverDelUser from './PopoverDelUser'
import PopoverDelChat from './PopoverDelChat'

export default function ElementDeleteSymbol(props) {
  const { item, index, selected } = props
  const { credentials } = useGlobalCredentialsContext()
  const { itemIndex } = useContext(context)

  return (
    <div>
      { item.private === true && itemIndex !== undefined && 
        selected[index] && item.owner === credentials.userId &&
          <PopoverDelPrivChat placement="rightStart" props={props} />
      }
      { item.private === false && itemIndex !== undefined && 
        selected[index] && item.owner !== credentials.userId &&
          <PopoverUnsubscribeChat placement="rightStart" props={props} />
      }
      { item.private === false && itemIndex !== undefined && 
        selected[index] && item.owner === credentials.userId &&
          <PopoverDelChat placement="rightStart" props={props} />
      }
      { item.login && itemIndex !== undefined && 
        selected[index] &&
          <PopoverDelUser placement="rightStart" props={props} />
      }
    </div>
  )
}