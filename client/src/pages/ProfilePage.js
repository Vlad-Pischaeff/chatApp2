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

export default function ProfilePage() {
  let history = useHistory()
  const [showUpload, setShowUpload] = useState(false)
  const [show, setShow] = useState(true)
  const { avatar, credentials, saveCredentials, setAvatar } = useContext(context)
  const { request, loading, error, header } = useHttp()
  const login = useAuth('login', false)

  useEffect(() => {
    login.setValue(credentials.login)
    setAvatar(credentials.avatar)
    return function() {}
  }, [])

  const updateUserProfile = async () => {
    const id = credentials.userId
    const body = {login: login.value, avatar: avatar }
    try {
      const data = await request(`/api/auth/user/${id}`, 'PATCH', body, header)
      saveCredentials({...credentials, login: data.login, avatar: data.avatar})
      setAvatar(data.avatar)
      closePage()
    } catch (e) {Alert.error(`/api/auth/user/${id} error ... ${e}`, 5000) }
  }

  const closePage = () => {
    history.goBack()
    setShow(false)
    setAvatar(null)
  }

  return (
    <Modal size="xs" show={show} onHide={closePage} >
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
        { avatar
          ? <img src={avatar} style={styles.icon} onClick={() => setShowUpload(true)} />
          : <Icon icon="avatar" size="4x" style={styles.icon} onClick={() => setShowUpload(true)} />
        }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={updateUserProfile} appearance="primary"  >
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