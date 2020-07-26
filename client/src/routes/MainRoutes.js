import React, { useContext } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import MainAppPage from '../pages/MainAppPage'
import ProfilePage from '../pages/ProfilePage'
import ChatRoomPage from '../pages/ChatRoomPage'
import SearchResultPage from '../pages/SearchResultPage'
import InviteUsersPage from '../pages/InviteUsersPage'
import NotificationsPage from '../pages/NotificationsPage'
import HelpPage from '../pages/HelpPage'
import { context } from '../context/context'

export default function MainRoutes() {
  const { credentials } = useContext(context)
  const isAuthenticated = !!credentials.token
  let location = useLocation()
  let background = location.state && location.state.background

  // console.log('location ...', background, location)

  if (isAuthenticated) {
    return (
      <>
        <Switch location={background || location}>
          <Route path='/' exact component={MainAppPage} />
          <Route path='/profile' exact children={<ProfilePage />} />
          <Route path='/chatroom' exact children={<ChatRoomPage />} />
          <Route path='/privatechat' exact children={<ChatRoomPage />} />
          <Route path='/search' exact children={<SearchResultPage />} />
          <Route path='/invite' exact children={<InviteUsersPage />} />
          <Route path='/notifications' exact children={<NotificationsPage />} />
          <Route path='/help' exact children={<HelpPage />} />
          <Redirect to='/' />
        </Switch>
        { background && 
          <Switch>
            <Route path='/profile' exact children={<ProfilePage />} />
            <Route path='/chatroom' exact children={<ChatRoomPage />} />
            <Route path='/privatechat' exact children={<ChatRoomPage />} />
            <Route path='/search' exact children={<SearchResultPage />} />
            <Route path='/invite' exact children={<InviteUsersPage />} />
            <Route path='/notifications' exact children={<NotificationsPage />} />
            <Route path='/help' exact children={<HelpPage />} />
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