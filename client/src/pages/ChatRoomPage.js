import React, { useState, useContext } from 'react'
import { Modal, Button, FormGroup, FormControl, ControlLabel, Form, Icon, Alert } from 'rsuite'
import ModalSelectImage from '../components/ModalSelectImage'
import { context } from '../context/context'
import { useAuth } from '../hooks/auth.hook'
import { useHttp } from '../hooks/http.hook'
import { useHistory } from 'react-router-dom'

const styles = {
  body: { margin: '1rem 0' },
  icon: { margin: '1rem 0 0 0' }
}

export default function ChatRoomPage() {
  let history = useHistory()
  const [show, setShow] = useState(true)
  const [showUpload, setShowUpload] = useState(false)
  const { avatar, headers, setAvatar, activeKey, setItems } = useContext(context)
  const chatroomname = useAuth('chatroomname', false)
  const chatroomdesc = useAuth('chatroomdesc', false)
  const { request, loading, error } = useHttp()

  const handleClick = async (e) => {
    try {
      if (chatroomname.value && chatroomdesc.value) {
        const body = { 
          name: chatroomname.value,
          description: chatroomdesc.value,
          private: activeKey === 'chatroom' ? false : true,
          avatar: avatar ? avatar : null
         }
        const data = await request('/api/room/create', 'PUT', body, headers)
        setItems(data)
        Alert.success(`Room "${chatroomname.value}" created ....`, 5000)
        closePage()
      } else {
        Alert.error('Please fill required fields ...', 5000)
      }
    } catch (e) {
      Alert.error(e.message, 5000)
    }
  }
  
  const clearData = () => {
    chatroomname.onFocus()
    chatroomdesc.onFocus()
    setAvatar(null)
  }

  const closePage = () => {
    history.goBack()
    clearData()
    setShow(false)
    setAvatar(null)
  }

  return (
    <Modal size="xs" show={show} onHide={closePage} >
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
          ? <img src={avatar} style={styles.icon} onClick={() => setShowUpload(true)} />
          : <Icon icon="image" size="4x" style={styles.icon} onClick={() => setShowUpload(true)} />
        }
      </Modal.Body>
      <Modal.Footer>
        <Button appearance="primary" onClick={handleClick} >
          Ok
        </Button>
        <Button onClick={closePage} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
      <ModalSelectImage show={showUpload} setShow={setShowUpload} />
    </Modal>
  )
}