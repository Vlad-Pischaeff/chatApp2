import React, { useState } from 'react'
import { Input, InputGroup, Icon, Avatar, Badge, Nav, IconButton } from 'rsuite'
import conversations from '../avatars/conversations.svg'
// import {Chatroom} from '../avatars/Chatroom'
import privatechat from '../avatars/social-network.svg'
import chatroom from '../avatars/chat-room.svg'

const styles = {
  column: {
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'space-between',
    height: '82vh',
  },
  main: {
    flex: '2 1 auto',
    background: '#cce9ff',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
  },
  aside: {
    minWidth: '18rem',
    background: '#e6d7ff',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
  },
  section: {
    flex: '2 1 auto',
    background: '#c9d7ff'
  },
  menu: {
    height: '6.5rem',
    background: '#cce9ff'
  },
  content: {
    flex: '2 1 auto',
  },
  footer: {
    flex: '0 1 auto',
    background: '#a6d7ff'
  },
  search: {
    width: '97%',
    margin: '3px'
  },
  icon: {
    width: '3rem',
    background: 'transparent',
  },
  iconwrap: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0.5rem'
  },
  plus: {
    margin: '0.5rem'
  }

}

export default function MainAppPage () {
  const [activeKey, setActiveKey] = useState()

  const handleSelect = (e) => {
    setActiveKey(e)
    console.log('event ...', e)
  }

  const handleClick = () => {
    console.log('plus...', activeKey)
  }

  return (
    <div style={styles.column}>
      <main style={styles.main}>
        <aside style={styles.aside}>
          <section style={styles.menu}>
            <InputGroup size='md' style={styles.search}>
              <Input placeholder='search' />
              <InputGroup.Addon>
                <Icon icon="search" />
              </InputGroup.Addon>
            </InputGroup>
            <Nav appearance="tabs" justified onSelect={handleSelect} activeKey={activeKey}>
              <Nav.Item eventKey="conversations" icon={<Avatar src={conversations} style={styles.icon} />}></Nav.Item>
              <Nav.Item eventKey="chatroom" icon={<Avatar src={chatroom} style={styles.icon} />}></Nav.Item>
              <Nav.Item eventKey="privatechat" icon={<Avatar src={privatechat} style={styles.icon} />}></Nav.Item>
              <IconButton appearance="ghost" icon={<Icon icon="plus" />} circle size="lg" style={styles.plus} onClick={handleClick} />
            </Nav>
            
          </section>
          <section style={styles.content}>
            content
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
    </div>
  )
}