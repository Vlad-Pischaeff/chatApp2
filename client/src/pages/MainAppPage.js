import React, { useState, useEffect, useContext } from 'react'
import { Icon, Avatar, Nav, IconButton } from 'rsuite'
import conversations from '../avatars/conversations.svg'
import privatechat from '../avatars/social-network.svg'
import chatroom from '../avatars/chat-room.svg'
import AddChatRoom from '../components/AddChatRoom'
import SearchInput from '../components/SearchInput'
import { context } from '../context/context'
import { useHttp } from '../hooks/http.hook'
import ElementCard from '../components/ElementCard'

const styles = {
  flexrow: { display: 'flex', justifyContent: 'space-between', flexFlow: 'row nowrap',},
  flexcol: { display: 'flex', justifyContent: 'space-between', flexFlow: 'column nowrap', },
  wrap: { flex: '1 1 auto', },
  main: { flex: '1 0 auto', background: '#cce9ff', },
  aside: { flex: '0 0 18rem', background: '#e6d7ff', },
  menu: { flex: '0 0 6.5rem', background: '#cce9ff', },
  rooms: { flex: '1 1 10.5rem', },
  chat: { flex: '1 1 16.5rem', overflowY: 'auto', background: '#c9d7ff', },
  footer: { background: '#a6d7ff', height: '3.5rem', flex: '0 0 auto', },
  icon: { width: '3rem', background: 'transparent', },
  plus: { margin: '0.5rem', }
}

export default function MainAppPage () {
  const [activeKey, setActiveKey] = useState('conversations')
  const [show, setShow] = useState(false)
  const [disabledPlus, setDisabledPlus] = useState(true)
  const { request, loading, error } = useHttp()
  const { headers } = useContext(context)
  const [items, setItems] = useState([])
  
  useEffect(() => {
    const getChatrooms = async (point) => {
      try {
        const data = await request(`/api/room/${point}`, 'GET', null, headers)
        setItems(data)
        // console.log('data ...', point, data)
      } catch (e) { console.log('login user error...', e) }
    }
    getChatrooms(activeKey)
    activeKey === 'conversations' ? setDisabledPlus(true) : setDisabledPlus(false)
  }, [activeKey])

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
            { activeKey === 'conversations'
              ? <ElementCard data={[]} />
              : <ElementCard data={items} />
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