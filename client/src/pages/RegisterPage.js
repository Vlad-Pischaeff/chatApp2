import React, { useState, useEffect, useContext } from 'react'
import { Avatar, Icon, Alert, Button, Content, 
        FlexboxGrid, Panel, Form, FormGroup, ControlLabel, 
        FormControl, ButtonToolbar } from "rsuite"
import { AvatarDefault } from '../avatars/user/AvatarDefault'
import { useAuth } from '../hooks/auth.hook'
import { useHttp } from '../hooks/http.hook'
import { context } from '../context/context'
import ModalUserAvatars from '../components/ModalUserAvatars'

const styles = {
  content: {
    height: '100%',
  },
  item: {
    minWidth: '25rem',
    background: 'rgba(52, 152, 255, 0.1)'
  },
  svg: { 
    background: 'rgba(52, 152, 255, 0.3)', 
    height: "5rem", 
    width: "5rem" 
  },
  icon: {
    color: '#999'
  }
}

export default function RegisterPage () {
  const [show, setShow] = useState(false)
  const login = useAuth('login', false)
  const password = useAuth('password', false)
  const { request, loading, error } = useHttp()
  const { setMenu, userAvatar, saveCredentials } = useContext(context)
  
  useEffect(() => {
    if (error) Alert.error(`${error}`, 5000)
  }, [error])

  useEffect(()=> {
    setMenu('signin')
  }, [])

  const handlerRegister = async () => {
    if (login.value && password.value) {
      try {
        // const body = `{ "login":"${login.value}", "password":"${password.value}" }`
        const body = { login: login.value, password: password.value, avatar: userAvatar }
        const data = await request('/api/auth/register', 'POST', body)
        saveCredentials(data)
        // console.log('register user data ...', data)
      } catch (e) {
        console.log('register user error ...', e)
      }
    } else {
      Alert.error('No empty login or password ...', 5000)
    }
  }

  return (

      <Content>
      <FlexboxGrid justify="center" align="middle" style={styles.content}>
        <FlexboxGrid.Item colspan={12} style={styles.item}>
          <Panel header={<h3>Sign up</h3>} bordered shaded>
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
                  { !userAvatar
                    ? <Icon icon="avatar" size="4x" style={styles.icon} />
                    // ? <AvatarDefault style={styles.svg} />
                    : <img src={userAvatar} style={styles.svg} />
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
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <ModalUserAvatars show={show} setShow={setShow} />
    </Content>

  )
}