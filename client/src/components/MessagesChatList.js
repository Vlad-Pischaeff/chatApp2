import React, { useContext, useEffect, useState } from 'react'
import { context } from '../context/context'
import { useHttp } from '../hooks/http.hook'

const styles = {
  wrap: { maxWidth: '65%',  display: 'flex',  flexFlow: 'row nowrap', margin: '1rem', },
  mywrap: { display: 'flex',  flexFlow: 'row-reverse nowrap', margin: '1rem', },
  wrapmsg: { maxWidth: '65%',  display: 'flex',  flexFlow: 'column nowrap', 
              padding: '0.2rem 0.3rem', },
  mymsg: { background: '#a6d7ff', color: 'black', },
  msg: { background: '#409cff', color: 'white', },
  img: { width: '3rem', height: '3rem', },
  arrow: {
    margin: '0',
    padding: '0',
    content: '',  
    width: '1rem',
    height: '1rem',
    position: 'relative',
    borderStyle: 'solid',
  },
  left: {
    borderWidth: '1rem 0 0 1rem',
    borderColor: 'rgb(64, 156, 255) transparent transparent transparent',
  },
  right: {
    borderWidth: '0 0 1rem 1rem',
    borderColor: ' transparent transparent transparent rgb(166, 215, 255)',
  },
  date: { fontSize: '0.7rem', },
  user: { fontSize: '1rem', },
  color: { color: 'cyan', },
  mycolor: { color: 'cornflowerblue', },
}

export default function MessagesChatList() {
  const { items, itemIndex, messages, setMessages, credentials } = useContext(context)
  const { request, loading, error, header } = useHttp()
  const [ users, setUsers ] = useState([])
  let to = itemIndex === undefined ? null : items[itemIndex]._id
  let msgList = null

  useEffect(() => {
    setMessages([])
  }, [])
 
  useEffect(() => {
    const getInformation = async () => {
      let data = null
      if (itemIndex !== undefined) {
        data = await getChatMessages()
        setMessages(data)
        data = await getChatUsersProfiles()
        setUsers(data)
        msgList = await setElements()
      }
    }
    getInformation()
  }, [itemIndex])

  const setElements = async () => {
    let msgs = []
    // if (itemIndex !== undefined && users.length !== 0 && messages.length !== 0) {
      msgs = messages.map((item, index) => {
        let date = new Date(item.date).toLocaleString() 
        let i = users.findIndex(user => user._id === item.from)
        console.log('chat room user ...', i, item, index, itemIndex, users.length, messages.length)
        return credentials.userId !== item.from
          ? <section key={index} style={styles.wrap} >
              <img src={users[i].avatar} style={styles.img} />
              <span style={{...styles.arrow, ...styles.left}}></span>
              <article style={{...styles.wrapmsg, ...styles.msg}}>
                <div style={{...styles.date, ...styles.color}}> {date} </div>
                <div style={{...styles.user, ...styles.color}}> User {users[i].login} wrote : </div>
                <div> {item.text} </div>
              </article>
            </section>
          : <section key={index} style={styles.mywrap} >
              <img src={credentials.avatar} style={styles.img} />
              <span style={{...styles.arrow, ...styles.right}}></span>
              <article style={{...styles.wrapmsg, ...styles.mymsg}}>
                <div style={{...styles.date, ...styles.mycolor}}> {date} </div>
                <div> {item.text} </div>
              </article>
            </section>    
        })
    // }
    return msgs
  }

  const getChatMessages = async () => {
    const API = `/api/message/chat/${to}`
    const data = await request(API, 'GET', null, header)
    // setMessages(data)
    console.log('chat room messages ...', data, itemIndex, messages.length)
    return data
  }

  const getChatUsersProfiles = async () => {
    console.log('chat room followers1 ...', itemIndex, users.length)
    const arr = [...items[itemIndex].followers, items[itemIndex].owner]
    const body = { invited: arr }
    const API = '/api/auth/invited'
    const data = await request(API, 'POST', body, header)
    // setUsers(data)
    console.log('chat room followers2 ...', arr, data, itemIndex, users.length)
    return data
  }

  return msgList
}