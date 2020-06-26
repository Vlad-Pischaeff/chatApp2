import React, { useState, useContext, useEffect } from 'react'
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

export default function ProfilePage({ setShow, activeKey}) {
  let history = useHistory()
  const [showUpload, setShowUpload] = useState(false)
  const { avatar, credentials, headers, setAvatar } = useContext(context)
  const login = useAuth('login', false)
  const { request, loading, error } = useHttp()

  useEffect(() => {
    handleClick()
    login.value = credentials.login
  }, [])

  const handleClick = async (e) => {
    const id = credentials.userId
    try {
      const data = await request(`/api/auth/user/${id}`, 'GET', null, headers)
      setAvatar(data.avatar)
    } catch (e) {
      Alert.error(e.message, 5000)
    }
  }
  
  const clearData = () => {
    login.onFocus()
    setAvatar(null)
  }

  const Hide = (e) => {
    clearData()
    e.stopPropagation()
    history.goBack()
  }

  return (
    <Modal size="xs" show="true" onHide={Hide} >
      <Modal.Header>
        <Modal.Title>Edit Your profile ...</Modal.Title>
      </Modal.Header>
      <Modal.Body style={styles.body} >
        <Form>
          <FormGroup>
            <ControlLabel>Login name ...</ControlLabel>
            <FormControl name="login" {...login} />
          </FormGroup>
        </Form>
        { credentials
          ? <img src={avatar} style={styles.icon} onClick={() => setShowUpload(true)} />
          : <Icon icon="image" size="4x" style={styles.icon} onClick={() => setShowUpload(true)} />
        }
      </Modal.Body>
      <Modal.Footer>
        <Button appearance="primary" onClick={Hide} >
          Ok
        </Button>
        <Button onClick={Hide} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
      <ModalSelectImage show={showUpload} setShow={setShowUpload} />
    </Modal>
  )
}