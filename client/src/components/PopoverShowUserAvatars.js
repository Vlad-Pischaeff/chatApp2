import React, { useContext, useEffect, useState } from  'react'
import { Popover, Whisper, Icon } from "rsuite"
import { context } from '../context/context'
import { useHttp } from '../hooks/http.hook'

const styles = { 
  icon: { margin: '0 0.2rem', }, 
  image: { margin: '0 0.2rem', width: '3.5rem', }, 
  flex: { display: 'flex', justifyContent: 'space-between', alignItems: 'center',}
}

const Speaker = ({ item, ...props }) => {
  const { credentials } = useContext(context)
  const { request } = useHttp()
  const [ users, setUsers ] = useState()

  useEffect(() => {
    const getInvitedUsers = async () => {
      let arr = [...item.followers, item.owner]
      const body = { invited: arr }
      const API ='/api/auth/invited'
      return await request(API, 'POST', body)
    }
    getInvitedUsers()
      .then(data => setUsers(data))
  }, [])

  return (
    <Popover title="Invited users ..." {...props}>
      <div style={styles.flex}>
        {users && users.map((item, index) => 
          item._id === credentials.userId
          ? <div key={index} ></div>
          : <div key={index} >
              { item.avatar
                ? <img src={item.avatar} style={styles.image} alt='' />
                : <Icon icon="image" style={styles.image} />
              }
            </div>
        )}
      </div>
    </Popover>
  )
}

export default function PopoverShowUserAvatars({ placement, item }) {
  return (
    <Whisper  trigger="hover" 
              // triggerRef={triggerRef}
              placement={placement} 
              speaker={<Speaker item={item} />} >
      <Icon icon="user" style={styles.icon} /> 
    </Whisper>
  )
}