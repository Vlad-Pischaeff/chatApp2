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
  flex: { display: 'flex', justifyContent: 'space-between', },
  row: { flexFlow: 'row nowrap', },
  col: { flexFlow: 'column nowrap', },
  height: { height: '82vh', },
  main: { flex: '1 1 auto', background: '#cce9ff', },
  aside: { minWidth: '18rem', background: '#e6d7ff', },
  section: { flex: '2 1 auto', background: '#c9d7ff', },
  menu: { height: '6.5rem', background: '#cce9ff', },
  content: { flex: '1 1 auto', },
  footer: { background: '#a6d7ff', height: '3.5rem', },
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
    <div style={{...styles.flex, ...styles.col, ...styles.height}}>
      <main style={{...styles.flex, ...styles.row, ...styles.main}}>
        <aside style={{...styles.flex, ...styles.col, ...styles.aside}}>
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
          <section style={styles.content}>
            { activeKey === 'conversations'
              ? <ElementCard data={[]} />
              : <ElementCard data={items} />
            }    
          </section>
        </aside>
        <article style={styles.section}>
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