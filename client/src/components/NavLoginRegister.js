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
        <Navbar.Header><h3>Chat application</h3></Navbar.Header>

          <Nav pullRight>
            <Link to="/">
              <Nav.Item eventKey="1" icon={<Icon icon="home" />} componentClass="span"> Home </Nav.Item>
            </Link>
            { menu === 'signin'
              ? <Link to="/login">
                  <Nav.Item eventKey="2" componentClass="span"> Login </Nav.Item>
                </Link>
              : <Link to="/register">
                  <Nav.Item eventKey="3" componentClass="span"> Register </Nav.Item>
                </Link>
            }
          </Nav>

      </Navbar>
    </Header>
  )
}