import React, { useContext } from 'react'
import { context } from '../context/context'
import { Icon } from 'rsuite'
import PopoverShowUserAvatars from './PopoverShowUserAvatars'

const styles = {
  icon: { margin: '0 0.2rem',  },
}

export default function ElementInformSymbol(props) {
  const { item } = props
  const { activeKey, credentials } = useContext(context)

  return (
    <div>
      { activeKey === 'chatroom' && item.owner === credentials.userId &&
          <Icon icon="avatar" style={styles.icon} />
      }
      { activeKey === 'privatechat' && item.followers && item.followers.length !== 0 &&
          <PopoverShowUserAvatars placement="rightStart" item={item} />
      }
      { activeKey === 'privatechat' && item.followers && item.followers.length === 0 &&
          <Icon icon="user-o" style={styles.icon} />
      }
      { item.private === true && 
          <Icon icon="lock" style={styles.icon} />
      }
    </div>
  )
}