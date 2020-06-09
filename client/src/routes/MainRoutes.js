import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import MainAppPage from '../pages/MainAppPage'
import { context } from '../context/context'

export default function MainRoutes () {
  const { credentials } = useContext(context)
  const isAuthenticated = !!credentials.token
  
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path='/' exact component={MainAppPage} />
        <Redirect to='/' />
      </Switch>
    )
  }
  return (
      <Switch>
        <Route path='/login' exact component={LoginPage} />
        <Route path='/register' exact component={RegisterPage} />
        <Redirect to='/login' />
      </Switch>
  )
}