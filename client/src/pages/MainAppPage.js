import React, { useState, useEffect, useContext } from 'react'
import { Avatar, Nav, Loader, Alert, IconButton, Icon, Whisper, Tooltip } from 'rsuite'
import conversations from '../avatars/conversations.svg'
import privatechat from '../avatars/social-network.svg'
import chatroom from '../avatars/chat-room.svg'
import { context, useGlobalLinksContext } from '../context/context'
import { useHttp } from '../hooks/http.hook'
import { useWSParse } from '../hooks/wsparse.hook'
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
  footerleft: { justifyContent: 'flex-start', width: '12rem', },
  icon: { width: '3rem', background: 'transparent', },
  plus: { margin: '0.5rem', },
  list: { height: '100%' }
}

export default function MainAppPage () {
  const { request } = useHttp()
  const { sockMsg } = useWSParse()
  const { links, setLinks } = useGlobalLinksContext()
  const { items, setItems, activeKey, setActiveKey, setItemIndex } = useContext(context)
  const [ selectOne, setSelectOne ] = useState({})
  const [ loading, setLoading ] = useState(false)

  useEffect(() => { 
    if (sockMsg) {
      sockMsg.privchatadd && activeKey === 'privatechat' && getItemsList()
      sockMsg.privchatdel && activeKey === 'privatechat' && getItemsList()
      sockMsg.chatdel && activeKey === 'chatroom' && getItemsList()    
    }
  }, [sockMsg])

  useEffect(() => { 
    getItemsList() 
  }, [activeKey])
  
  useEffect(() => {
    getAllLinks()
      .then(e => fillLinks(e))
  }, [])

  const getItemsList = () => {
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
  }

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
                : <ElementList selected={selectOne} setSelected={setSelectOne} data={items} style={styles.list} multi='false' modal='false'/>  
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
        <div style={{...styles.flexrow, ...styles.footerleft}}>
          <Whisper  placement="topStart" trigger="hover" 
                    speaker={<Tooltip>See source on Github</Tooltip>}>
            <IconButton icon={<Icon icon="github" />} 
                      color="blue" circle style={styles.plus}
                      href="https://github.com/Vlad-Pischaeff/chatApp2"/>
          </Whisper>
          <Whisper  placement="topStart" trigger="hover" 
                    speaker={<Tooltip>See my workout on Codepen</Tooltip>}>
            <IconButton icon={<Icon icon="codepen" />} 
                      color="blue" circle style={styles.plus}
                      href="https://codepen.io/vlad-pischaeff/"/>
          </Whisper>
          <Whisper  placement="topStart" trigger="hover" 
                    speaker={<Tooltip>Docker image</Tooltip>}>
            <IconButton icon={<Icon icon="cubes" />} 
                      color="blue" circle style={styles.plus}
                      href="https://hub.docker.com/r/pischaeff/chat"/>
          </Whisper>
        </div>
        <SendMessageInput />
      </footer>
    </div>
  )
}