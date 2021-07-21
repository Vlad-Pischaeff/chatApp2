import React, { useContext, useEffect, useState, useRef } from 'react'
import { context, useGlobalWebsocketContext } from '../context/context'
import { useHttp } from '../hooks/http.hook'
import MessageChatListElement from './MessageChatListElement'

export default function MessagesChatList() {
  const { socketMessage } = useGlobalWebsocketContext()
  const { items, itemIndex, activeKey } = useContext(context)
  const { request } = useHttp()
  const [ newMessages, setNewMessages ] = useState([])
  let to = itemIndex !== undefined ? items[itemIndex]._id : null
  const liRef = useRef('')
  let msgList = null
  // console.log('MessageChatList ...', socketMessage)
  useEffect(() => {
    liRef.current && liRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [newMessages])

  useEffect(() => {
    setNewMessages([])
  }, [activeKey])

  useEffect(() => {
    getInformation()
  }, [itemIndex])

  useEffect(() => {
    // console.log('MessageChatList ...', socketMessage)
    if (itemIndex !== undefined && socketMessage.to === items[itemIndex]._id) {
      getInformation()
    }
  }, [socketMessage])

  const getInformation = async () => {
    if (itemIndex !== undefined && !!items[0] && !!items[0].followers ) {
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
    msgList = newMessages.map((item, index) => {
      let date = new Date(item.date).toLocaleString() 
      return  <li key={index} ref={liRef}>
                <MessageChatListElement item={item} date={date} />
              </li>
    })
  }

  return msgList
}