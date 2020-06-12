import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Header, Navbar, Nav, Icon } from 'rsuite'
import { context } from '../context/context'

const styles = {
  header: {
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

export default function MainAppNav() {
  const { credentials } = useContext(context)

  return (
    <Header>
      <Navbar appearance="inverse" >
        <Navbar.Header style={styles.header}>
          { credentials.avatar
            ? <img src={credentials.avatar} style={styles.svg} />
            : <Icon icon="avatar" size="3x" />
          }
        </Navbar.Header>

        <Nav pullRight>
          <Nav.Item eventKey="1" icon={<Icon icon="home" />} componentClass="span">
            <Link to="/">Home</Link>
          </Nav.Item>
          <Nav.Item eventKey="2" componentClass="span">
            <Link to="/profile">Profile</Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    </Header>
  )
}