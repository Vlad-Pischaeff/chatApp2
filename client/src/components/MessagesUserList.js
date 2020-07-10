import React, { useContext, useEffect, useState, useRef } from 'react'
import { context } from '../context/context'
import { useHttp } from '../hooks/http.hook'
import MessageUserListElement from './MessageUserListElement'

export default function MessagesUserList() {
  const { items, itemIndex, credentials, socketMessage, activeKey } = useContext(context)
  const [ newMessages, setNewMessages ] = useState([])
  const { request } = useHttp()
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
    itemIndex !== undefined && 
    items[0].friends !== undefined && 
    getUserMessages()
  }, [itemIndex])

  useEffect(() => {
    if (items[itemIndex] !== undefined && 
        ((socketMessage.to === items[itemIndex]._id && socketMessage.from === credentials.userId) ||
        (socketMessage.from === items[itemIndex]._id && socketMessage.to === credentials.userId))) {
        getUserMessages()
    }
  }, [socketMessage])

  const getUserMessages = async () => {
    const API = `/api/message/user/${to}`
    const data = await request(API, 'GET')
    setNewMessages(data)
  }

  if (itemIndex !== undefined && newMessages.length !== 0) {
    msgList = newMessages.map((item, index) => {
      let date = new Date(item.date).toLocaleString() 
      return  <li key={index} ref={liRef}>
                <MessageUserListElement item={item} date={date} />
              </li>
    })
  }
  
  return msgList
}