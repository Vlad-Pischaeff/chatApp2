import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Header, Navbar, Nav, Icon, Badge } from 'rsuite'
import { context } from '../context/context'
import SearchInput from './SearchInput'
import { useHttp } from '../hooks/http.hook'

const styles = {
  lheader: {
    flex:  '0 1 auto',
    display: 'flex',
    alignItems: 'center',
    margin: '0 1rem',
    fontSize: '1.5rem',
  },
  svg: { 
    height: '3.5rem', 
    width: '3.5rem',
    margin: '0 1rem 0 0' 
  },
  notify: {
    position: 'relative',
    left: '1rem',
  }
}

export default function NavMainApp() {
  const { request } = useHttp()
  const { credentials, deleteCredentials, setAvatar, activeKey, items, itemIndex } = useContext(context)
  const [ notifications, setNotifications ] = useState([])
  const history = useHistory()
  let location = useLocation()

  useEffect(() => {
    getNewNotifications()
      .then(e => setNotifications(e))
  }, [])

  const getNewNotifications = async () => {
    return await request('/api/notification/new', 'GET')
  }

  const Logout = (e) => {
    e.preventDefault()
    deleteCredentials()
    setAvatar(null)
    history.push('/')
  }

  return (
    <Header>
      <Navbar appearance="inverse" >
        <Navbar.Header style={styles.lheader}>
          { credentials.avatar
            ? <img src={credentials.avatar} style={styles.svg} alt='' />
            : <Icon icon="avatar" size="3x" />
          }
          <div><h5>{credentials.login}</h5></div>
          { activeKey !== 'privatechat' &&  <SearchInput /> }
        </Navbar.Header>

        <Nav pullRight>
          
          <Link to={{ pathname: '/notifications', state: {background: location, notifications} }}>
            <Badge content="2" style={styles.notify}><></></Badge>
            <Nav.Item eventKey="1" componentClass="span"
                    icon={<Icon icon="bell" />}>Notifications</Nav.Item>
          </Link>

          { activeKey === 'privatechat' && 
            itemIndex !== undefined &&
            items[itemIndex].owner === credentials.userId &&
              <Link to={{ pathname: '/invite', state: {background: location} }}>
                <Nav.Item eventKey="2" componentClass="span"
                          icon={<Icon icon="people-group" />}>Invite users</Nav.Item>
              </Link>
          }

          { activeKey !== 'conversations' &&
            <Link to={{ pathname: `/${activeKey}`, state: {background: location} }}>
              <Nav.Item eventKey="3" componentClass="span"
                        icon={<Icon icon="comments" />}>Add {activeKey}</Nav.Item>
            </Link>
          }

          <Link to={{ pathname: '/profile', state: {background: location} }}>
            <Nav.Item eventKey="4" componentClass="span"
                      icon={<Icon icon="avatar" />}>Profile</Nav.Item>
          </Link>
         
          <Link to="/" >
            <Nav.Item eventKey="5" componentClass="span" 
                      icon={<Icon icon="exit" />} onClick={Logout}>Exit</Nav.Item>
          </Link>

        </Nav>
      </Navbar>
    </Header>
  )
}