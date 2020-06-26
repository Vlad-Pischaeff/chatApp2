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
  const { credentials, deleteCredentials } = useContext(context)
  const history = useHistory()
  let location = useLocation()

  const Logout = (e) => {
    e.preventDefault()
    deleteCredentials()
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
        </Navbar.Header>

        <Nav pullRight>
          <Nav.Item eventKey="1" componentClass="span">
            <Link to={{
                        pathname: '/profile', 
                        state: {background: location}
                      }}>
              Profile
            </Link>
          </Nav.Item>

          <Nav.Item eventKey="2" icon={<Icon icon="exit" />} onClick={Logout} componentClass="span">
            <Link to="/" >Exit</Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    </Header>
  )
}