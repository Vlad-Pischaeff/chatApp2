import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Header, Navbar, Nav, Icon } from 'rsuite'
import { context } from '../context/context'

const styles = {
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  lheader: {
    flex:  '0 1 auto',
    display: 'flex',
    alignItems: 'center',
    margin: '0 1rem',
    fontSize: '1.5rem',
    width: '20rem'
  }
}

export default function NavLoginRegister() {
  const { menu } = useContext(context)

  return (
    <Header>
      <Navbar appearance="inverse" style={styles.navbar}>
        <Navbar.Header style={styles.header}>Chat application</Navbar.Header>

          <Nav pullRight>
            <Nav.Item eventKey="1" icon={<Icon icon="home" />} componentClass="span">
              <Link to="/">Home</Link>
            </Nav.Item>
            {
              menu === 'signin'
              ? <Nav.Item eventKey="2" componentClass="span">
                  <Link to="/login">Login</Link>
                </Nav.Item>
              : <Nav.Item eventKey="3" componentClass="span">
                  <Link to="/register">Register</Link>
                </Nav.Item>
            }
          </Nav>

      </Navbar>
    </Header>
  )
}