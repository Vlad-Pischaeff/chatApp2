import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'

export default function MainRoutes () {
  return (

      <Switch>
        <Route path='/login' exact component={LoginPage} />
        <Route path='/register' exact component={RegisterPage} />
        <Redirect to='/login' />
      </Switch>

  )
}