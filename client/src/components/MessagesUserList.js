import React, { useContext, useEffect } from 'react'
import { context } from '../context/context'
import { useHttp } from '../hooks/http.hook'

const styles = {
  wrap: { maxWidth: '75%',  display: 'flex',  flexFlow: 'row nowrap', margin: '1rem', },
  mywrap: { display: 'flex',  flexFlow: 'row-reverse nowrap', margin: '1rem', },
  wrapmsg: { maxWidth: '75%',  display: 'flex',  flexFlow: 'column nowrap', padding: '0.2rem 0.3rem', },
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
  date: { fontSize: '0.7rem',  },
  color: { color: 'cyan', },
  mycolor: { color: 'cornflowerblue', },
}

export default function MessagesUserList() {
  const { items, itemIndex, setItemIndex, messages, setMessages, credentials } = useContext(context)
  const { request, loading, error, header } = useHttp()
  let to = itemIndex === undefined ? null : items[itemIndex]._id
  let msgList = null

  useEffect(() => {
    setMessages([])
    return function () { setItemIndex() }
  }, [])

  useEffect(() => {
    itemIndex !== undefined && items[0].friends !== undefined && getUserMessages()
  }, [itemIndex])

  const getUserMessages = async () => {
    const API = `/api/message/user/${to}`
    const data = await request(API, 'GET', null, header)
    setMessages(data)
  }

  if (itemIndex !== undefined) {
    msgList = messages.map((item, index) => {
      let date = new Date(item.date).toLocaleString() 
      return credentials.userId !== item.from
        ? <section key={index} style={styles.wrap} >
            <img src={items[itemIndex].avatar} style={styles.img} />
            <span style={{...styles.arrow, ...styles.left}}></span>
            <article style={{...styles.wrapmsg, ...styles.msg}}>
              <div style={{...styles.date, ...styles.color}}> {date} </div>
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
  }
  
  return msgList
}