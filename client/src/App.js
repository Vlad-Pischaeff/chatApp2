import React, { useContext } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import 'rsuite/lib/styles/themes/default/index.less'
import { Container } from 'rsuite'
import MainRoutes from './routes/MainRoutes'
import NavLoginRegister from './components/NavLoginRegister'
import NavMainApp from './components/NavMainApp'
import { GlobalCredentialsContext } from './context/context'

const styles = {
  container: { 
    height: '100vh', 
    minWidth: '40rem',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    background: 'rgba(124, 191, 255, 0.3)',
  },
}
	
export default function App () {
  const { credentials } = useContext(GlobalCredentialsContext)

  return (
      <Container style={styles.container}>
        <Router>
          { Object.keys(credentials).length === 0 
            ? <NavLoginRegister /> 
            : <NavMainApp /> 
          }
          <MainRoutes />
        </Router>
      </Container>
  )
}