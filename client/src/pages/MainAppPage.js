import React, { useState, useEffect, useContext } from 'react'
import { Icon, Avatar, Nav, IconButton, Loader, Alert } from 'rsuite'
import conversations from '../avatars/conversations.svg'
import privatechat from '../avatars/social-network.svg'
import chatroom from '../avatars/chat-room.svg'
import AddChatRoom from '../components/AddChatRoom'
import SearchInput from '../components/SearchInput'
import { context } from '../context/context'
import { useHttp } from '../hooks/http.hook'
import ElementList from '../components/ElementList'

const styles = {
  flexrow: { display: 'flex', justifyContent: 'space-between', flexFlow: 'row nowrap',},
  flexcol: { display: 'flex', justifyContent: 'space-between', flexFlow: 'column nowrap', },
  wrap: { flex: '1 1 auto', },
  main: { flex: '1 0 auto', background: '#cce9ff', },
  aside: { flex: '0 0 18rem', background: 'rgba(196, 162, 252, 0.44)', },
  menu: { flex: '0 0 6.5rem', background: '#cce9ff', },
  rooms: { flex: '1 1 10.5rem', overflowY: 'auto', },
  chat: { flex: '1 1 16.5rem', overflowY: 'auto', background: '#c9d7ff', },
  footer: { background: '#a6d7ff', height: '3.5rem', flex: '0 0 auto', },
  icon: { width: '3rem', background: 'transparent', },
  plus: { margin: '0.5rem', },
  list: { height: '100%' }
}

export default function MainAppPage () {
  const [activeKey, setActiveKey] = useState('conversations')
  const [show, setShow] = useState(false)
  const [disabledPlus, setDisabledPlus] = useState(true)
  const { request, loading, error } = useHttp()
  const { headers } = useContext(context)
  const [items, setItems] = useState([])
  const [selectOne, setSelectOne] = useState({})
  
  useEffect(() => {
    activeKey === 'conversations' ? setDisabledPlus(true) : setDisabledPlus(false)
    activeKey === 'conversations' ? getFriends() : getChatrooms(activeKey)
    setSelectOne({})
  }, [activeKey])

  //update list of rooms after adding new room
  useEffect(() => {
    !show && activeKey !== 'conversations' && getChatrooms(activeKey)
  }, [show])

  const getChatrooms = async () => {
    try {
      const data = await request(`/api/room/${activeKey}`, 'GET', null, headers)
      setItems(data)
      console.log('rooms data ...', activeKey, data)
    } catch (e) { Alert.error(`/api/room/${activeKey} error ... ${e}`, 5000) }
  }

  const getFriends = async () => {
    try {
      const data = await request('/api/auth/friends', 'GET', null, headers)
      setItems(data)
      console.log('friends data ...', activeKey, data)
    } catch (e) { Alert.error(`/api/auth/friends error ... ${e}`, 5000) }
  }
  
  return (
    <div style={{...styles.flexcol, ...styles.wrap}}>
      <main style={{...styles.flexrow, ...styles.main}}>
        <aside style={{...styles.flexcol, ...styles.aside}}>
          <section style={styles.menu}>
            <SearchInput activeKey={activeKey} />
             
            <Nav appearance="tabs" justified onSelect={e => setActiveKey(e)} activeKey={activeKey}>
              <Nav.Item eventKey="conversations" icon={<Avatar src={conversations} style={styles.icon} />}></Nav.Item>
              <Nav.Item eventKey="chatroom" icon={<Avatar src={chatroom} style={styles.icon} />}></Nav.Item>
              <Nav.Item eventKey="privatechat" icon={<Avatar src={privatechat} style={styles.icon} />}></Nav.Item>
              <IconButton appearance="primary" icon={<Icon icon="plus"/>} style={styles.plus} circle size="lg" 
                          disabled={disabledPlus} onClick={() => setShow(true)} />
            </Nav>
          </section>

          <section style={styles.rooms}>
            { loading 
              ? <Loader size='md' style={styles.plus} />
              : <ElementList selected={selectOne} setSelected={setSelectOne} data={items} style={styles.list} multi='false' />  
            }
          </section>

        </aside>
        <article style={styles.chat}>
          colspan={16}
        </article>
      </main>
      <footer style={styles.footer}>
        <h3>
          MAIN APP
        </h3>
      </footer>
      <AddChatRoom show={show} setShow={setShow} activeKey={activeKey} />
    </div>
  )
}