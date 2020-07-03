import React, { useContext, useEffect, useState } from  'react'
import { Popover, Button, Whisper, Icon } from "rsuite"
import { context } from '../context/context'
import { useHttp } from '../hooks/http.hook'
let trigger = null

const styles = { 
  icon: { margin: '0 0.2rem', }, 
  image: { margin: '0 0.2rem', width: '3.5rem', }, 
  flex: { display: 'flex', justifyContent: 'space-between', alignItems: 'center',}
}

const Speaker = ({ item, ...props }) => {
  const { credentials, setItems, items, itemIndex, setItemIndex } = useContext(context)
  const { request, loading, error, header } = useHttp()
  const [ users, setUsers ] = useState()

  useEffect(() => {
    const getInvitedUsers = async () => {
      const body = { invited: item.followers }
      const API ='/api/auth/invited'
      const data = await request(API, 'POST', body, header)
      setUsers(data)
      console.log('invited users ...', data)
    }
    getInvitedUsers()
  }, [])

  return (

    <Popover title="Invited users ..." {...props}>
      <div style={styles.flex}>
        {users && users.map((item,index) => 
          <div>
            { item.avatar
              ? <img src={item.avatar} style={styles.image} />
              : <Icon icon="image" style={styles.image} />
            }
          </div>
        )}
      </div>
    </Popover>
  )
}

export default function PopoverShowUserAvatars({ placement, item }) {
  const triggerRef = ref => (trigger = ref)

  return (
    <Whisper  trigger="hover" 
              triggerRef={triggerRef}
              placement={placement} 
              speaker={<Speaker item={item} />} >
      <Icon icon="user" size="1x" style={styles.icon} /> 
    </Whisper>
  )
}