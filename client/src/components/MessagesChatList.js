import React, { useContext, useEffect, useState, useRef } from 'react'
import { context } from '../context/context'
import { useHttp } from '../hooks/http.hook'
import MessageChatListElement from './MessageChatListElement'

export default function MessagesChatList() {
  const { items, itemIndex, socketMessage, activeKey, links, setLinks } = useContext(context)
  const { request } = useHttp()
  const [ newMessages, setNewMessages ] = useState([])
  let to = items[itemIndex] === undefined ? null : items[itemIndex]._id
  const liRef = useRef('')
  let msgList = null

  useEffect(() => {
    liRef.current && liRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [newMessages])

  useEffect(() => {
    setNewMessages([])
  }, [activeKey])

  useEffect(() => {
    getInformation()
    setLinksMsgsFalse()
  }, [itemIndex])

  useEffect(() => {
    if (items[itemIndex] !== undefined && 
        socketMessage.toroom === items[itemIndex]._id) {
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
  
  const setLinksMsgsFalse = () => {
    const obj = { ...links }
    obj[to] = { ...obj[to], 'msgs': false }
    setLinks(obj)
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