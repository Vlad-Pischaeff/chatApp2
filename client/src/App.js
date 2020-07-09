import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import 'rsuite/lib/styles/themes/default/index.less'
import { Container } from 'rsuite'
import MainRoutes from './routes/MainRoutes'
import NavLoginRegister from './components/NavLoginRegister'
import NavMainApp from './components/NavMainApp'
import {context} from './context/context'
import { useMenu } from './hooks/menu.hook'
import { useStorage } from './hooks/storage.hook'
import  useWebsocket from './hooks/websocket.hook'

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
  const [ avatar, setAvatar] = useState(null)
  const [ items, setItems ] = useState([])            //aside items
  const [ itemIndex, setItemIndex ] = useState()      //currently selected item index
  const [ messages, setMessages ] = useState([])      //currently visible messages
  const [ activeKey, setActiveKey ] = useState('conversations')
  const [ links, setLinks ] = useState({})            // my friends, subscriptions and my 
                                                      // chatrooms current state
  const { menu, setMenu } = useMenu()
  const { credentials, saveCredentials, deleteCredentials } = useStorage()
  const { socketRef, socketMessage, socketSendMessage } = useWebsocket()


  useEffect(() => {
    if (credentials.userId) {
      // socketSendMessage({ 'online': credentials.userId })
    }
  }, [credentials])

  // console.log('items ...', items, itemIndex)
  return (
    <context.Provider value={{ menu, setMenu, 
                               avatar, setAvatar,
                               activeKey, setActiveKey, 
                               credentials, saveCredentials, deleteCredentials,
                               socketRef, socketMessage, socketSendMessage,
                               items, setItems,
                               itemIndex, setItemIndex,
                               messages, setMessages,
                               links, setLinks }}>
      <Container style={styles.container}>
        <Router>
          { Object.keys(credentials).length === 0 ? <NavLoginRegister /> : <NavMainApp /> }
          <MainRoutes />
        </Router>
      </Container>
    </context.Provider>
  )
}