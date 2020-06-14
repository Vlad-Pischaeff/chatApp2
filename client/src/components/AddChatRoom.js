import React, { useState, useContext } from 'react'
import { Modal, Button, FormGroup, FormControl, ControlLabel, Form, Icon } from 'rsuite'

const styles = {
  body: {
    margin: '1rem 0'
  },
  icon: {
    margin: '1rem 0 0 0'
  }
}

export default function AddChatRoom({show, setShow, activeKey}) {
  const [chatroomImg, setChatroomImg] = useState(null)

  return (
    <Modal size="xs" show={show} onHide={() => setShow(false)} >
      <Modal.Header>
        <Modal.Title>Create your own chatroom ...</Modal.Title>
      </Modal.Header>
      <Modal.Body style={styles.body} >
        <Form>
          <FormGroup>
            <ControlLabel>Name of chatroom ...</ControlLabel>
            <FormControl name="name"/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Description ...</ControlLabel>
            <FormControl name="password" />
          </FormGroup>
        </Form>
        { !chatroomImg
          ? <Icon icon="image" size="5x" style={styles.icon} />
          // ? <AvatarDefault style={styles.svg} />
          : <img src={chatroomImg} style={styles.svg} />
        }
      </Modal.Body>
      <Modal.Footer>
        <Button appearance="primary">
          Ok
        </Button>
        <Button onClick={() => setShow(false)} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}