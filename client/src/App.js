import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import 'rsuite/lib/styles/themes/default/index.less'
import { Container } from 'rsuite'
import MainRoutes from './routes/MainRoutes'
import CustomFooter from './components/CustomFooter'
import CustomNav from './components/CustomNav'
import {context} from './context/context'
import { useMenu } from './hooks/menu.hook'
import { useStorage } from './hooks/storage.hook'

const styles = {
  container: {
    height: '100vh',
  },
}
	
export default function App () {
  const { menu, setMenu } = useMenu()
  const [userAvatar, setUserAvatar] = useState(null)
  const { credentials, saveCredentials } = useStorage()
 
  return (
    <context.Provider value={{ menu, setMenu, 
                               userAvatar, setUserAvatar, 
                               credentials, saveCredentials }}>
      <Container style={styles.container}>
        <Router>
          <CustomNav />
          <MainRoutes />
        </Router>
        <CustomFooter />
      </Container>
    </context.Provider>
  )
}