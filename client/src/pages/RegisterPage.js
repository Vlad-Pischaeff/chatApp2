import React, { useState, useEffect, useContext } from 'react'
import { Avatar,Icon, Alert, Button, Content, FlexboxGrid, Panel, Form, FormGroup, ControlLabel, FormControl, ButtonToolbar, Checkbox } from "rsuite"
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
}

export default function RegisterPage () {
  const [show, setShow] = useState(false)
  const [save, setSave] = useState(false)
  const login = useAuth('login', save)
  const password = useAuth('password', save)
  const { request, loading, error } = useHttp()
  const { setMenu, userAvatar } = useContext(context)
  
  useEffect(() => {
    (!login.value || !password.value) && setSave(false)
  }, [login, password])

  useEffect(() => {
    if (error) Alert.error(`${error}`, 5000)
  }, [error])

  useEffect(()=> {
    setMenu('signin')
  }, [])

  const handlerRegister = async () => {
    try {
      // const body = `{ "login":"${login.value}", "password":"${password.value}" }`
      const body = { login: login.value, password: password.value }
      const data = await request('/api/auth/register', 'POST', body)
      console.log('register user data...', data)
     } catch (e) {
      console.log('register user error...', e)
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
                {/* <Avatar>
                  <AvatarDefault style={{ background: "#999" }} />
                </Avatar> */}
                <Button appearance="ghost" onClick={() => setShow(true)}>
                  { !userAvatar
                    ? <AvatarDefault style={styles.svg} />
                    : <img src={userAvatar} style={styles.svg} />
                  }
                  <div>Choose avatar</div>
                </Button>
              </FormGroup>
              <FormGroup>
                <ButtonToolbar>
                  <Button appearance="primary" onClick={handlerRegister} loading={loading}>Sign up</Button>
                  {/* <Button appearance="link">
                    <Link to="/register">Choose avatar</Link>
                  </Button> */}
                  {/* <Checkbox inline checked={save} onClick={() => setSave(!save)}>Remember me</Checkbox> */}
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