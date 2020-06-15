import React, { useState, useContext } from 'react'
import { Modal, Button, FormGroup, FormControl, ControlLabel, Form, Icon, Alert } from 'rsuite'
import ModalSelectImage from './ModalSelectImage'
import { context } from '../context/context'
import { useAuth } from '../hooks/auth.hook'
import { useHttp } from '../hooks/http.hook'

const styles = {
  body: { margin: '1rem 0' },
  icon: { margin: '1rem 0 0 0' }
}

export default function AddChatRoom({show, setShow, activeKey}) {
  const [showUpload, setShowUpload] = useState(false)
  const { avatar, credentials } = useContext(context)
  const chatroomname = useAuth('chatroomname', false)
  const chatroomdesc = useAuth('chatroomdesc', false)
  const { request, loading, error } = useHttp()

  const handleClick = async () => {
    try {
      if (chatroomname.value && chatroomdesc.value) {
        const body = { 
          name: chatroomname.value
         }
        const data = await request('/api/room/create', 'POST', body, {Authorization: `Bearer ${credentials.token}`})
        console.log('create room data ...', data)
      } else {
        Alert.error('Please fill required fields ...', 5000)
      }
    } catch (e) {
      console.log('add chat room error ...', e, error)
    }

  }

  return (
    <Modal size="xs" show={show} onHide={() => setShow(false)} >
      <Modal.Header>
        <Modal.Title>Create your own chatroom ...</Modal.Title>
      </Modal.Header>
      <Modal.Body style={styles.body} >
        <Form>
          <FormGroup>
            <ControlLabel>Name of chatroom ...</ControlLabel>
            <FormControl name="chatroomname" {...chatroomname} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Description ...</ControlLabel>
            <FormControl name="chatroomdesc" {...chatroomdesc} />
          </FormGroup>
        </Form>
        { avatar
          ? <img src={avatar} style={styles.icon} />
          : <Icon icon="image" size="4x" style={styles.icon} onClick={() => setShowUpload(true)} />
        }
      </Modal.Body>
      <Modal.Footer>
        <Button appearance="primary" onClick={handleClick} >
          Ok
        </Button>
        <Button onClick={() => setShow(false)} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
      <ModalSelectImage show={showUpload} setShow={setShowUpload} />
    </Modal>
  )
}