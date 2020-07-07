import React, { useContext, useEffect, useState } from 'react'
import { context } from '../context/context'
import { useHttp } from '../hooks/http.hook'

const styles = {
  wrap: { maxWidth: '65%',  display: 'flex',  flexFlow: 'row nowrap', margin: '1rem', },
  mywrap: { display: 'flex',  flexFlow: 'row-reverse nowrap', margin: '1rem', },
  wrapmsg: { maxWidth: '65%',  display: 'flex',  flexFlow: 'column nowrap', padding: '0.2rem 0.3rem', },
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
  const [ newMessages, setNewMessages ] = useState([])
  let to = itemIndex === undefined ? null : items[itemIndex]._id
  let msgList = null

  useEffect(() => { setMessages([]) }, [])
 
  useEffect(() => {
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
        // to messages array ...
        let newMessages = data.map(item => {
          item.avatar = userAvatars[item.from]
          item.login = userLogins[item.from]
          return item
        })

        setNewMessages(newMessages)
      }
    }
    getInformation()
  }, [itemIndex])

  const getChatMessages = async () => {
    const API = `/api/message/chat/${to}`
    return await request(API, 'GET', null, header)
  }

  const getChatUsersProfiles = async () => {
    const arr = [...items[itemIndex].followers, items[itemIndex].owner]
    const body = { invited: arr }
    const API = '/api/auth/invited'
    return await request(API, 'POST', body, header)
  }
   
  if (itemIndex !== undefined && newMessages.length !== 0) {
    msgList = newMessages.map(item => {
      let date = new Date(item.date).toLocaleString() 
      return credentials.userId !== item.from
        ? <section key={item._id} style={styles.wrap} >
            <img src={item.avatar} style={styles.img} />
            <span style={{...styles.arrow, ...styles.left}}></span>
            <article style={{...styles.wrapmsg, ...styles.msg}}>
              <div style={{...styles.date, ...styles.color}}> {date} </div>
              <div style={{...styles.user, ...styles.color}}> User {item.login} wrote : </div>
              <div> {item.text} </div>
            </article>
          </section>
        : <section key={item._id} style={styles.mywrap} >
            <img src={item.avatar} style={styles.img} />
            <span style={{...styles.arrow, ...styles.right}}></span>
            <article style={{...styles.wrapmsg, ...styles.mymsg}}>
              <div style={{...styles.date, ...styles.mycolor}}> {date} </div>
              <div> {item.text} </div>
            </article>
          </section>    
    })
  }
  
  return msgList
}