import React, { useState, useEffect, useContext } from 'react'
import { Button, Panel, Form, FormGroup, 
         ControlLabel, FormControl, ButtonToolbar, Checkbox, Alert } from "rsuite";
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/auth.hook'
import { context } from '../context/context'
import { useHttp } from '../hooks/http.hook'

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

  useEffect(() => {
    if (error) Alert.error(`${error}`, 5000)
  }, [error])

  useEffect(()=> {
    setMenu('signup')
  }, [])

  const loginHandler = async (e) => {
    try {
      const body = { login: login.value, password: password.value }
      const data = await request('/api/auth/login', 'POST', body)
      saveCredentials(data)
      // console.log('login user data...', data)
    } catch (e) {
      console.log('login user error...', e)
    }
  }

  return (
    <section style={styles.wrap}>
      <Panel header={<h3>Sign in</h3>} bordered shaded style={styles.item}>
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
    </section>
  )
}