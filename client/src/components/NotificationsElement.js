import React, { useState, useEffect } from 'react'
import { Icon, Checkbox, Whisper, Tooltip } from 'rsuite'
import { useHttp } from '../hooks/http.hook'
import { useGlobalNotificationsContext } from '../context/context'

const styles = {
  flex: { display: 'flex', justifyContent: 'space-between', },
  content: { flex: '1 1 auto', margin: '0 0 0 0.4rem', flexFlow: 'column nowrap', overflow: 'hidden', },
  name: { fontSize: '1.2rem', lineHeight: '2rem', },
  description: { fontSize: '0.8rem', },
  elipsis: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', }, 
  noselect: { background: '#abd6ff', margin: '0.2rem', },
  img: { height: '3.5rem', padding: '0.2rem',},
  noimg: { fontSize: '3.3rem', width: '3.5rem', textAlign: 'center', padding: '0.2rem',},
}

export default function NotificationsElement(props) {
  const { item, index } = props
  const { request } = useHttp()
  const [ checked, setChecked ] = useState()
  const { notifications, setNotifications } = useGlobalNotificationsContext()
  let date = new Date(item.date).toLocaleString()

  useEffect(() => {
    setChecked(item.verify)
  }, [item])

  const handleCheckBox = async () => {
    const body = { verify: !checked }
    const id = item._id
    await request(`/api/notification/${id}`, 'PATCH', body)
    setChecked(!checked)

    if (!checked) {
      if (notifications !== 1) {
        setNotifications(notifications - 1)
      } else {
        setNotifications(false)
      }
    } else {
      if (notifications) {
        setNotifications(notifications + 1)
      } else { 
        setNotifications(1)
      }
    }
  }
  
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
        <div style={{...styles.description, ...styles.elipsis}} >{date}</div>
      </div>

        <Whisper placement="top" trigger="hover" speaker={<Tooltip>Not show in future</Tooltip>}>
          <div>
            <Checkbox checked={checked} onChange={handleCheckBox} ></Checkbox>  
          </div>
        </Whisper>

    </section>

  )
}