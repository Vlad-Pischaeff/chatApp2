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
  const { request } = useHttp()
  const { items, setItems, activeKey, setActiveKey, itemIndex, setItemIndex, socketMessage, setLinks, links, credentials } = useContext(context)
  const [selectOne, setSelectOne] = useState({})
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    setLoading(true)
    activeKey === 'conversations' 
      ? getFriends()
          .then(e => setItems(e))
          .then(() => setLoading(false)) 
      : getChatrooms(activeKey)
          .then(e => setItems(e))
          .then(() => setLoading(false))
    setSelectOne({})
    setItemIndex()
  }, [activeKey])
  
  useEffect(() => {
    getAllLinks()
      .then(e => fillLinks(e))
  }, [])

  useEffect(() => {
    let obj = {...links}
    if (socketMessage.online) {
      let key = socketMessage.online
      if ((obj[key] !== undefined) && (obj[key]['online'] === false)) {
        obj[key] = { ...obj[key], 'online' : true }
        setLinks(obj)
      } // if user is our friend and hi is online, then set property obj[key]['online'] = true
    }
    if (socketMessage.offline) {
      let key = socketMessage.offline
      if ((obj[key] !== undefined) && (obj[key]['online'] === true)) {
        obj[key] = { ...obj[key], 'online' : false }
        setLinks(obj)
      } // if user is our friend and hi is offline, then set property obj[key]['online'] = false
    }
    if (socketMessage.toroom) {
      let key = socketMessage.toroom
      if (obj[key] !== undefined && 
          (items[itemIndex] === undefined || key !== items[itemIndex]._id)) {
        let val = obj[key]['msgs'] === false 
          ? 1 
          : +obj[key]['msgs'] + 1
        obj[key] = { ...obj[key], 'msgs': val }
        setLinks(obj)
      } // if room is in our subscription or we own it,
    }   // then set property obj[key]['msgs'] = as counter of new messages to room
    if (socketMessage.fromuser && socketMessage.to === credentials.userId) {
      let key = socketMessage.fromuser
      if (obj[key] !== undefined &&
          (items[itemIndex] === undefined || key !== items[itemIndex]._id)) {
        let val = obj[key]['msgs'] === false 
          ? 1 
          : +obj[key]['msgs'] + 1
        obj[key] = { ...obj[key], 'msgs': val }
        setLinks(obj)
      } // if user is our friend,
    }   // then set property obj[key]['msgs'] = as counter of new messages from user
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
    data.forEach(e =>  obj[e._id] = { 'msgs': false, 'online': false })
    setLinks({ ...links, ...obj })
  }

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