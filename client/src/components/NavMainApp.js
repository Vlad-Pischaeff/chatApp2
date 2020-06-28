import React, { useContext } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Header, Navbar, Nav, Icon } from 'rsuite'
import { context } from '../context/context'

const styles = {
  lheader: {
    flex:  '0 1 auto',
    display: 'flex',
    alignItems: 'center',
    margin: '0 1rem',
    fontSize: '1.5rem',
    width: '20rem'
  },
  svg: { 
    height: '3.5rem', 
    width: '3.5rem',
    margin: '0 1rem 0 0' 
  }
}

export default function NavMainApp() {
  const { credentials, deleteCredentials, setAvatar, activeKey } = useContext(context)
  const history = useHistory()
  let location = useLocation()

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
            ? <img src={credentials.avatar} style={styles.svg} />
            : <Icon icon="avatar" size="3x" />
          }
          <div>
            <strong>{credentials.login}</strong>
          </div>
        </Navbar.Header>

        <Nav pullRight>
          { activeKey === 'conversations'
            ? <></>
            : <Link to={{ pathname: `/${activeKey}`, state: {background: location} }}>
                <Nav.Item eventKey="1" componentClass="span"
                          icon={<Icon icon="comments" />}>Add {activeKey}</Nav.Item>
              </Link>
          }
          <Link to={{ pathname: '/profile', state: {background: location} }}>
            <Nav.Item eventKey="2" componentClass="span"
                      icon={<Icon icon="avatar" />}>Profile</Nav.Item>
          </Link>
         
          <Link to="/" >
            <Nav.Item eventKey="3" componentClass="span" 
                      icon={<Icon icon="exit" />} onClick={Logout}>Exit</Nav.Item>
          </Link>
          
        </Nav>
      </Navbar>
    </Header>
  )
}