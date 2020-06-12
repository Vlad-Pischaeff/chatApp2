import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import 'rsuite/lib/styles/themes/default/index.less'
import { Container } from 'rsuite'
import MainRoutes from './routes/MainRoutes'
import CustomFooter from './components/CustomFooter'
import CustomNav from './components/CustomNav'
import MainAppNav from './components/MainAppNav'
import {context} from './context/context'
import { useMenu } from './hooks/menu.hook'
import { useStorage } from './hooks/storage.hook'
import  useWebsocket from './hooks/websocket.hook'

const styles = {
  container: {
    height: '100vh',
  },
}
	
export default function App () {
  const { menu, setMenu } = useMenu()
  const [userAvatar, setUserAvatar] = useState(null)
  const { credentials, saveCredentials } = useStorage()
  const { socketRef, sendMessage } = useWebsocket()
 
  useEffect(() => {
    if (credentials.userId) {
      sendMessage(`client connected ... ${credentials.userId}`)
    }
  }, [credentials.userId])

  return (
    <context.Provider value={{ menu, setMenu, 
                               userAvatar, setUserAvatar, 
                               credentials, saveCredentials,
                               socketRef }}>
      <Container style={styles.container}>
        <Router>
          { credentials.token ? <MainAppNav /> : <CustomNav /> }
          <MainRoutes />
        </Router>
        <CustomFooter />
      </Container>
    </context.Provider>
  )
}