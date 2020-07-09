import React, { useContext, useEffect, useState } from 'react'
import { context } from '../context/context'
import { useHttp } from '../hooks/http.hook'
import { Loader } from 'rsuite'
import MessageElement from './MessageElement'

const styles = {
  loader: { margin: '2rem', },
}

export default function MessagesChatList() {
  const { items, itemIndex, credentials, socketMessage } = useContext(context)
  const { request, loading } = useHttp()
  const [ newMessages, setNewMessages ] = useState([])
  let to = items[itemIndex] === undefined ? null : items[itemIndex]._id
  let msgList = null

  useEffect(() => {
    getInformation()
  }, [itemIndex])

  useEffect(() => {
    if (items[itemIndex] !== undefined && 
        socketMessage.to === items[itemIndex]._id) {
      getInformation()
    }
  }, [socketMessage])

  const getInformation = async () => {
    if (itemIndex !== undefined && items[0].followers !== undefined) {
      let data = await getChatUsersProfiles()
      let userAvatars = data.reduce((obj, item) => {
        obj[item._id] = item.avatar
        return obj 
      }, {})      
      let userLogins = data.reduce((obj, item) => {
        obj[item._id] = item.login
        return obj 
      }, {})   

      data = await getChatMessages()
      // add "from" users avatar & login information
      // to new messages array ...
      let newMessages = data.map(item => {
        item.avatar = userAvatars[item.from]
        item.login = userLogins[item.from]
        return item
      })

      setNewMessages(newMessages)
    }
  }

  const getChatMessages = async () => {
    const API = `/api/message/chat/${to}`
    return await request(API, 'GET')
  }

  const getChatUsersProfiles = async () => {
    const arr = [...items[itemIndex].followers, items[itemIndex].owner]
    const body = { invited: arr }
    const API = '/api/auth/invited'
    return await request(API, 'POST', body)
  }
   
  if (itemIndex !== undefined && newMessages.length !== 0) {
    msgList = newMessages.map(item => {
      let date = new Date(item.date).toLocaleString() 
      return <MessageElement item={item} date={date} />
    })
  }
  
  if (loading)
    return <Loader size='lg' style={styles.loader} />
  else
    return msgList
}