import React, { useState, useEffect, useContext } from 'react'
import { Input, InputGroup, Icon, Avatar, Nav, IconButton } from 'rsuite'
import conversations from '../avatars/conversations.svg'
import privatechat from '../avatars/social-network.svg'
import chatroom from '../avatars/chat-room.svg'
import AddChatRoom from '../components/AddChatRoom'
import { context } from '../context/context'
import { useHttp } from '../hooks/http.hook'

const styles = {
  flex: { display: 'flex', justifyContent: 'space-between', },
  row: { flexFlow: 'row nowrap', },
  col: { flexFlow: 'column nowrap', },
  height: { height: '82vh', },
  main: { flex: '2 1 auto', background: '#cce9ff', },
  aside: { minWidth: '18rem', background: '#e6d7ff', },
  section: { flex: '2 1 auto', background: '#c9d7ff' },
  menu: { height: '6.5rem', background: '#cce9ff' },
  content: { flex: '2 1 auto' },
  footer: { flex: '0 1 auto', background: '#a6d7ff' },
  search: { width: '97%', margin: '3px' },
  icon: { width: '3rem', background: 'transparent' },
  plus: { margin: '0.5rem' }
}

export default function MainAppPage () {
  const [activeKey, setActiveKey] = useState('conversations')
  const [show, setShow] = useState(false)
  const [disabledPlus, setDisabledPlus] = useState(true)
  const [disabledSearch, setDisabledSearch] = useState(false)
  const { request, loading, error } = useHttp()
  const { headers } = useContext(context)
  const [items, setItems] = useState([])
  
  useEffect(() => {
    switch (activeKey) {
      case 'conversations':
        setDisabledPlus(true)
        setDisabledSearch(false)
        getChatrooms()
        break
      case 'chatroom':
        setDisabledPlus(false)
        setDisabledSearch(false)
        break
      case 'privatechat':
        setDisabledPlus(false)
        setDisabledSearch(true)
        break
    }
    // console.log('items', items)
  }, [activeKey])
  
  const getChatrooms = async (e) => {
    try {
      const data = await request('/api/room', 'GET', null, headers)
      setItems(data)
    } catch (e) { console.log('login user error...', e) }
  }

  return (
    <div style={{...styles.flex, ...styles.col, ...styles.height}}>
      <main style={{...styles.flex, ...styles.row, ...styles.main}}>
        <aside style={{...styles.flex, ...styles.col, ...styles.aside}}>
          <section style={styles.menu}>
            <InputGroup size='md' style={styles.search} disabled={disabledSearch} >
              <Input placeholder='search' />
              <InputGroup.Addon>
                <Icon icon="search" />
              </InputGroup.Addon>
            </InputGroup>
            <Nav appearance="tabs" justified onSelect={e => setActiveKey(e)} activeKey={activeKey}>
              <Nav.Item eventKey="conversations" icon={<Avatar src={conversations} style={styles.icon} />}></Nav.Item>
              <Nav.Item eventKey="chatroom" icon={<Avatar src={chatroom} style={styles.icon} />}></Nav.Item>
              <Nav.Item eventKey="privatechat" icon={<Avatar src={privatechat} style={styles.icon} />}></Nav.Item>
              <IconButton appearance="primary" icon={<Icon icon="plus"/>} style={styles.plus} circle size="lg" 
                          disabled={disabledPlus} onClick={() => setShow(true)} />
            </Nav>
            
          </section>
          <section style={styles.content}>
            {items.map((item, index) => {
              return  <div key={index} >
                        {item.name}
                      </div>
            })}
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