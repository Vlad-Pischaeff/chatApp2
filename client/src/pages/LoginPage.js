import React, { useState, useEffect, useContext } from 'react'
import { Button, Content, FlexboxGrid, Panel, Form, FormGroup, 
         ControlLabel, FormControl, ButtonToolbar, Checkbox  } from "rsuite";
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/auth.hook'
import { context } from '../context/context'
import { useHttp } from '../hooks/http.hook';

const styles = {
  content: {
    height: '100%'
  },
  item: {
    minWidth: '25rem',
    background: 'rgba(52, 152, 255, 0.1)'
  },
}

export default function LoginPage () {
  const [save, setSave] = useState(false)
  const login = useAuth('login', save)
  const password = useAuth('password', save)
  const { request, loading, error } = useHttp()
  const { setMenu, saveCredentials } = useContext(context)

  useEffect(() => {
    (!login.value || !password.value) && setSave(false)
  }, [login, password])

  useEffect(()=> {
    setMenu('signup')
  }, [])

  const loginHandler = async () => {
    try {
      const body = { login: login.value, password: password.value }
      const data = await request('/api/auth/login', 'POST', body)
      saveCredentials(data)
      console.log('login user data...', data)
    } catch (e) {
      console.log('login user error...', e)
    }
  }

  return (

      <Content>
        <FlexboxGrid justify="center" align="middle" style={styles.content}>
          <FlexboxGrid.Item colspan={12} style={styles.item}>
            <Panel header={<h3>Sign in</h3>} bordered shaded>
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
                  <ButtonToolbar >
                    <Button appearance="primary" onClick={loginHandler} loading={loading}>Sign in</Button>
                    <Button appearance="link">
                      <Link to="/register">Forgot password?</Link>
                    </Button>
                    <Checkbox inline checked={save} onClick={() => setSave(!save)}>Remember me</Checkbox>
                  </ButtonToolbar>
                </FormGroup>
              </Form>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>

  )
}