import React, { useContext } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import MainAppPage from '../pages/MainAppPage'
import ProfilePage from '../pages/ProfilePage'
import ChatRoomPage from '../pages/ChatRoomPage'
import SearchResultPage from '../pages/SearchResultPage'
import { context } from '../context/context'

export default function MainRoutes() {
  const { credentials } = useContext(context)
  const isAuthenticated = !!credentials.token
  let location = useLocation()
  let background = location.state && location.state.background

  console.log('location ...', background, location)

  if (isAuthenticated) {
    return (
      <>
        <Switch location={background || location}>
          <Route path='/' exact component={MainAppPage} />
          <Route path='/profile' exact children={<ProfilePage />} />
          <Route path='/chatroom' exact children={<ChatRoomPage />} />
          <Route path='/privatechat' exact children={<ChatRoomPage />} />
          <Route path='/search' exact children={<SearchResultPage />} />
          <Redirect to='/' />
        </Switch>
        { background && 
          <Switch>
            <Route path='/profile' exact children={<ProfilePage />} />
            <Route path='/chatroom' exact children={<ChatRoomPage />} />
            <Route path='/privatechat' exact children={<ChatRoomPage />} />
            <Route path='/search' exact children={<SearchResultPage />} />
          </Switch> 
        }
      </>
    )
  }
  return (
      <Switch location={background || location}>
        <Route path='/login' exact component={LoginPage} />
        <Route path='/register' exact component={RegisterPage} />
        <Redirect to='/login' />
      </Switch>
  )
}