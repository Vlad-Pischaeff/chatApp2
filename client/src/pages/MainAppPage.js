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
    activeKey === 'conversations' ? getFriends() : getChatrooms(activeKey)
    setSelectOne({})
    setItemIndex()
  }, [activeKey])
  
  useEffect(() => {
    if (socketMessage.online) {
      let obj = { 'online': true }
      setLinks({ ...links, [socketMessage.online]: obj })
      // console.log('MainAppPage new message ...', socketMessage)
    }
    if (socketMessage.offline) {
      let obj = { 'online': false }
      setLinks({ ...links, [socketMessage.offline]: obj })
      // console.log('MainAppPage new message ...', socketMessage)
    }
  }, [socketMessage])

  const getChatrooms = async () => {
    try {
      const data = await request(`/api/room/${activeKey}`, 'GET')
      setItems(data)
    } catch (e) { Alert.error(`/api/room/${activeKey} error ... ${e}`, 5000) }
  }

  const getFriends = async () => {
    try {
      const data = await request('/api/auth/friends', 'GET')
      setItems(data)
    } catch (e) { Alert.error(`/api/auth/friends error ... ${e}`, 5000) }
  }

  // console.log('MainAppPage links ...', links)
  
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