import React, { useState, useEffect, useContext } from 'react'
import { Avatar, Nav, Loader, Alert } from 'rsuite'
import conversations from '../avatars/conversations.svg'
import privatechat from '../avatars/social-network.svg'
import chatroom from '../avatars/chat-room.svg'
import { context } from '../context/context'
import { useHttp } from '../hooks/http.hook'
import ElementList from '../components/ElementList'
import SendMessageInput from '../components/SendMessageInput'
import MessagesUserList from '../components/MessagesUserList'
import MessagesChatList from '../components/MessagesChatList'

const styles = {
  flexrow: { display: 'flex', justifyContent: 'space-between', flexFlow: 'row nowrap',},
  flexcol: { display: 'flex', justifyContent: 'space-between', flexFlow: 'column nowrap', },
  wrap: { flex: '1 1 auto', },
  main: { flex: '1 0 auto', background: '#cce9ff', },
  aside: { background: 'rgba(196, 162, 252, 0.44)', width: '15rem' },
  menu: { flex: '0 0 3.5rem', background: '#cce9ff', },
  rooms: { flex: '1 1 15rem', overflowY: 'auto', },
  messages: { flex: '1 1 16.5rem', overflowY: 'auto', background: '#c9d7ff', },
  footer: { background: '#a6d7ff', height: '3.5rem', alignItems: 'center', },
  icon: { width: '3rem', background: 'transparent', },
  plus: { margin: '0.5rem', },
  list: { height: '100%' }
}

export default function MainAppPage () {
  const { request, loading } = useHttp()
  const { items, setItems, activeKey, setActiveKey, setItemIndex, socketMessage, setLinks, links } = useContext(context)
  const [selectOne, setSelectOne] = useState({})

  useEffect(() => {
    activeKey === 'conversations' 
      ? getFriends().then(e => setItems(e)) 
      : getChatrooms(activeKey).then(e => setItems(e))
    setSelectOne({})
    setItemIndex()
    console.log('MainAppPage ... activeKey effect')
  }, [activeKey])
  
  useEffect(() => {
    getAllLinks()
      .then(e => fillLinks(e))
    console.log('MainAppPage ... [] effect')
  }, [])

  useEffect(() => {
    console.log('MainAppPage ... [links] effect', links)
  }, [links])

  useEffect(() => {
    let obj = {...links}
    if (socketMessage.online) {
      let key = socketMessage.online
      console.log('online', key, obj)
      if ((obj[key] !== undefined) && (obj[key]['online'] === false)) {
        obj[key] = { ...obj[key], 'online' : true }
        setLinks(obj)
      }
    }
    if (socketMessage.offline) {
      let key = socketMessage.offline
      if ((obj[key] !== undefined) && (obj[key]['online'] === true)) {
        obj[key] = { ...obj[key], 'online' : false }
        setLinks(obj)
      }
    }
    if (socketMessage.to) {
      let key = socketMessage.to
      if (obj[key] !== undefined && !obj[key]['login']) {
        let val = obj[key]['msgs'] === false 
          ? 1 
          : obj[key]['msgs']++
        obj[key] = { ...obj[key], 'msgs': val }
        setLinks(obj)
      }
    }
    if (socketMessage.from) {
      let key = socketMessage.from
      if (obj[key]['login']) {
        let val = obj[key]['msgs'] === false 
          ? 1 
          : obj[key]['msgs']++
        obj[key] = { ...obj[key], 'msgs': val }
        setLinks(obj)
      }
    }
    console.log('MainAppPage ... [socketMessage] effect', links)
  }, [socketMessage])

  const getChatrooms = async (room) => {
    try {
      return await request(`/api/room/${room}`, 'GET')
    } catch (e) { Alert.error(`/api/room/${room} error ... ${e}`, 5000) }
  }

  const getFriends = async () => {
    try {
      return await request('/api/auth/friends', 'GET')
    } catch (e) { Alert.error(`/api/auth/friends error ... ${e}`, 5000) }
  }

  const getAllLinks = async () => {
    let friends = await getFriends()
    let chatrooms = await getChatrooms('chatroom')
    let privatechat = await getChatrooms('privatechat')
    return [...friends, ...chatrooms, ...privatechat]
  }

  const fillLinks = (data) => {
    let obj = {}
    data.forEach(e => {
      e.login
        ? obj[e._id] = { 'msgs': false, 'online': false, 'user': e.login }
        : obj[e._id] = { 'msgs': false, 'online': false }
    })
    setLinks({ ...links, ...obj })
  }
  console.log('MainAppPage ... render')
  return (
    <div style={{...styles.flexcol, ...styles.wrap}}>
      <main style={{...styles.flexrow, ...styles.main}}>
        <aside style={{...styles.flexcol, ...styles.aside}}>

          <section style={styles.menu}>
            <Nav appearance="tabs" justified onSelect={e => setActiveKey(e)} activeKey={activeKey}>
              <Nav.Item eventKey="conversations" icon={<Avatar src={conversations} style={styles.icon} />}></Nav.Item>
              <Nav.Item eventKey="chatroom" icon={<Avatar src={chatroom} style={styles.icon} />}></Nav.Item>
              <Nav.Item eventKey="privatechat" icon={<Avatar src={privatechat} style={styles.icon} />}></Nav.Item>
            </Nav>
          </section>

          <section style={styles.rooms}>
            { loading 
              ? <Loader size='md' style={styles.plus} />
              : <ElementList selected={selectOne} setSelected={setSelectOne} data={items} style={styles.list} multi='false' />  
            }
          </section>

        </aside>

        <article style={{...styles.flexcol, ...styles.messages}}> 
          <div style={styles.messages}>
          { activeKey === 'conversations'
              ? <MessagesUserList />
              : <MessagesChatList />
          }
          </div>
        </article>
        
      </main>
      <footer style={{...styles.flexrow, ...styles.footer}}>
        <h5> Footer </h5>
        <SendMessageInput />
      </footer>
    </div>
  )
}