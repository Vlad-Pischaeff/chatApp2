import React, { useContext, useEffect, useState, useRef } from 'react'
import { context, useGlobalCredentialsContext, useGlobalWebsocketContext } from '../context/context'
import { useHttp } from '../hooks/http.hook'
import MessageUserListElement from './MessageUserListElement'
import { Loader } from 'rsuite'

const styles = { loader: { margin: '2rem', }, }

export default function MessagesUserList() {
  const { credentials } = useGlobalCredentialsContext()
  const { socketMessage } = useGlobalWebsocketContext()
  const { items, itemIndex, activeKey } = useContext(context)
  const [ newMessages, setNewMessages ] = useState([])
  const { request } = useHttp()
  const [ loading , setLoading ] = useState(false)
  let to = ( !!items && itemIndex !== undefined ) ? items[itemIndex]._id : null
  const liRef = useRef('')
  let msgList = null

  useEffect(() => {
    liRef.current && liRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [newMessages, loading])

  useEffect(() => {
    setNewMessages([])
  }, [activeKey])

  useEffect(() => {
    if ( itemIndex !== undefined && !!items[0] && !!items[0].friends ) {  
      setLoading(true)
      getUserMessages()
        .then(e => setNewMessages(e))
        .then(() => setLoading(false))
    }
  }, [itemIndex])

  useEffect(() => {
    if ( !!items && itemIndex !== undefined && 
        ((socketMessage.to === items[itemIndex]._id && socketMessage.fromuser === credentials.userId) ||
        (socketMessage.fromuser === items[itemIndex]._id && socketMessage.to === credentials.userId))) {
        getUserMessages()
          .then(e => setNewMessages(e))
    }
  }, [socketMessage])

  const getUserMessages = async () => {
    const API = `/api/message/user/${to}`
    return await request(API, 'GET')
  }

  if ( itemIndex !== undefined && newMessages.length !== 0) {
    msgList = newMessages.map((item, index) => {
      let date = new Date(item.date).toLocaleString() 
      return  <li key={index} ref={liRef}>
                <MessageUserListElement item={item} date={date} />
              </li>
    })
  }

  if (loading)
    return <Loader size='md' style={styles.loader} />
  else
    return msgList 
}