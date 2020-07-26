import React, { useContext, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Header, Navbar, Nav, Icon, Badge, Whisper, Tooltip } from 'rsuite'
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
  },
  icon: {
    position: 'relative',
    top: '1.1rem',
    color: 'white',
  },
  wrap: {
    display: 'inline-block',
    margin: '0 0.5rem',
  },
}

export default function NavMainApp() {
  const { request } = useHttp()
  const { credentials, deleteCredentials, setAvatar, activeKey, items, itemIndex, notifications, setNotifications } = useContext(context)
  const history = useHistory()
  let location = useLocation()

  useEffect(() => {
    getNewNotifications()
      .then(e => e.length !== 0 ? setNotifications(e.length) : setNotifications(false))
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
          
          <Link to={{ pathname: '/notifications', state: { background: location } }}>
            <div style={styles.wrap} >
              <Badge content={notifications} style={styles.notify}><></></Badge>
              <Whisper placement="bottom" trigger="hover" speaker={<Tooltip>Notifications</Tooltip>}>
                <Icon icon="bell" style={styles.icon} />
              </Whisper>
            </div>
          </Link>

          { activeKey === 'privatechat' && 
            itemIndex !== undefined &&
            items[itemIndex].owner === credentials.userId &&
              <Link to={{ pathname: '/invite', state: {background: location} }}>
                <div style={styles.wrap} >
                  <Whisper placement="bottom" trigger="hover" speaker={<Tooltip>Invite users</Tooltip>}>
                    <Icon icon="people-group" style={styles.icon} />
                  </Whisper>
                </div>
              </Link>
          }

          { activeKey !== 'conversations' &&
            <Link to={{ pathname: `/${activeKey}`, state: {background: location} }}>
              <div style={styles.wrap} >
                <Whisper placement="bottom" trigger="hover" speaker={<Tooltip>Add {activeKey}</Tooltip>}>
                  <Icon icon="comments" style={styles.icon} />
                </Whisper>
              </div>
            </Link>
          }

          <Link to={{ pathname: '/profile', state: {background: location} }}>
            <div style={styles.wrap} >
              <Whisper placement="bottom" trigger="hover" speaker={<Tooltip>Profile</Tooltip>}>
                <Icon icon="avatar" style={styles.icon} />
              </Whisper>
            </div>
          </Link>
         
          <Link to="/" >
            <div style={styles.wrap} onClick={Logout} >
              <Whisper placement="bottom" trigger="hover" speaker={<Tooltip>Exit</Tooltip>}>
                <Icon icon="exit" style={styles.icon} />
              </Whisper>
            </div>
          </Link>

          <Link to={{ pathname: '/help', state: {background: location} }} >
            <div style={styles.wrap} >
              <Whisper placement="bottomEnd" trigger="hover" speaker={<Tooltip>Help</Tooltip>}>
                <Icon icon="question-circle2" style={styles.icon} />
              </Whisper>
            </div>
          </Link>

        </Nav>
      </Navbar>
    </Header>
  )
}