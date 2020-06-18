import React, { useState, useEffect, useContext } from 'react'
import { Icon, Alert, Button, FormControl, ButtonToolbar,
        Panel, Form, FormGroup, ControlLabel } from "rsuite"
import { useAuth } from '../hooks/auth.hook'
import { useHttp } from '../hooks/http.hook'
import { context } from '../context/context'
import ModalSelectImage from '../components/ModalSelectImage'

const styles = {
  wrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  item: {
    width: '25rem',
    background: 'rgba(52, 152, 255, 0.1)'
  },
  svg: { 
    background: 'rgba(52, 152, 255, 0.3)', 
    height: "5rem", 
    width: "5rem" 
  },
  icon: { color: '#999' }
}

export default function RegisterPage () {
  const [show, setShow] = useState(false)
  const login = useAuth('login', false)
  const password = useAuth('password', false)
  const { request, loading, error } = useHttp()
  const { setMenu, avatar, saveCredentials } = useContext(context)
  
  useEffect(() => {
    if (error) Alert.error(`${error}`, 5000)
  }, [error])

  useEffect(()=> {
    setMenu('signin')
  }, [])

  const handlerRegister = async (e) => {
    if (login.value && password.value) {
      try {
        const body = { login: login.value, password: password.value, avatar: avatar }
        const data = await request('/api/auth/register', 'POST', body)
        saveCredentials(data)
      } catch (e) {
        console.log('register user error ...', e)
      }
    } else {
      Alert.error('No empty login or password ...', 5000)
    }
  }

  return (
    <section style={styles.wrap} >
      <Panel header={<h3>Sign up</h3>} bordered shaded style={styles.item}>
        <Form fluid>
          <FormGroup>
            <ControlLabel>Username or email address</ControlLabel>
            <FormControl name="name" {...login} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Password</ControlLabel>
            <FormControl name="password" type="password" {...password} />
          </FormGroup>
          <FormGroup>
              <Button appearance="ghost" onClick={() => setShow(true)}>
              { avatar
                ? <img src={avatar} style={styles.svg} />
                : <Icon icon="avatar" size="4x" style={styles.icon} />
              }
              <div>Choose avatar</div>
            </Button>
          </FormGroup>
          <FormGroup>
            <ButtonToolbar>
              <Button appearance="primary" onClick={handlerRegister} loading={loading}>
                Sign up
              </Button>
            </ButtonToolbar>
          </FormGroup>
        </Form>
      </Panel>
      <ModalSelectImage show={show} setShow={setShow} />
    </section>
  )
}