import React, { useState } from 'react'
import { Modal, Button, Avatar, Icon } from 'rsuite'
import { useHistory } from 'react-router-dom'
import conversations from '../avatars/conversations.svg'
import privatechat from '../avatars/social-network.svg'
import chatroom from '../avatars/chat-room.svg'

const styles = { 
  body: { margin: '1rem 0' }, 
  icon: { width: '3rem', background: 'transparent', },
  search: { fontSize: '1.5rem', margin: '0 1rem', },
}

export default function HelpPage() {
  let history = useHistory()

  const [ show, setShow ] = useState(true)

  const closeWindow = () => {
    setShow(false)
    history.goBack()
  }

  return (
    <Modal show={show} onHide={closeWindow} size='sm' >
      <Modal.Header>
        <Modal.Title>Before You started ...</Modal.Title>
      </Modal.Header>

      <Modal.Body style={styles.body} >
        <p>
          Welcome to my trivial Chat application!
        </p>
        <p>
          First, choose <Avatar src={conversations} style={styles.icon} /> icon for "FRIENDS" tab.
        </p>
        <p>
          Then You can add friends, finding them by clicking on 
          <Icon icon="search" style={styles.search} /><br/>
          Search input field can be used for more detail search...
        </p>
        <p>
          You can also subscribe to public chats or create your own in
          <Avatar src={chatroom} style={styles.icon} /> "CHATROOM" tab...
        </p>
        <p>
          Use <Avatar src={privatechat} style={styles.icon} /> "PRIVATE CHATROOM" tab
          for discussing with Your friends...
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={closeWindow} appearance="default">
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  )
}