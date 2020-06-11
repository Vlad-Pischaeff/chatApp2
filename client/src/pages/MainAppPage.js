import React from 'react'
import { Input, InputGroup, Icon, Avatar } from 'rsuite'
import {Conversation} from '../avatars/Conversation'
import {Chatroom} from '../avatars/Chatroom'
import {PrivateChatroom} from '../avatars/PrivateChatroom'

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
    height: '6rem',
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
    margin: '0 1rem'
  },
  iconwrap: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
}

export default function MainAppPage () {
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
            <div style={styles.iconwrap}>
              <Conversation style={styles.icon} />
              <Chatroom style={styles.icon} />
              <PrivateChatroom style={styles.icon} />
              <Icon icon="plus" style={styles.icon} size="2x" />
            </div>
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