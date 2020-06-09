import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Header, Navbar, Nav, Icon, Button } from 'rsuite'
import { context } from '../context/context'

const styles = {
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  header: {
    flex:  '0 1 auto',
    display: 'flex',
    alignItems: 'center',
    margin: '0 1rem',
    fontSize: '1.5rem',
    width: '20rem'
  },
  svg: { 
    height: "3rem", 
    width: "3rem" 
  },
}

export default function MainAppNav() {
  const { credentials } = useContext(context)

  return (
    <Header>
      <Navbar appearance="inverse" style={styles.navbar}>
        <Navbar.Header style={styles.header}>Chat application</Navbar.Header>

          <Nav pullRight>
            <Nav.Item eventKey="1" icon={<Icon icon="home" />} componentClass="span">
              <Link to="/">Home</Link>
            </Nav.Item>
            <Nav.Item eventKey="2" componentClass="span">
              <Link to="/profile">Profile</Link>
            </Nav.Item>
          </Nav>
          
          <div>
            <img src={credentials.avatar} style={styles.svg} />
          </div>

      </Navbar>
    </Header>
  )
}