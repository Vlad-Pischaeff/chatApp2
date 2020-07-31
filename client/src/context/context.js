import React, { createContext, useState, useContext } from 'react'
import { useMenu } from '../hooks/menu.hook'
import { useStorage } from '../hooks/storage.hook'
import { useWebsocket } from '../hooks/websocket.hook'

export const GlobalCredentialsContext = createContext()
export const useGlobalCredentialsContext = () => useContext(GlobalCredentialsContext)

export const GlobalWebsocketContext = createContext()
export const useGlobalWebsocketContext = () => useContext(GlobalWebsocketContext)

export const GlobalNotificationsContext = createContext()
export const useGlobalNotificationsContext = () => useContext(GlobalNotificationsContext)

export const GlobalLinksContext = createContext()
export const useGlobalLinksContext = () => useContext(GlobalLinksContext)

export const context = createContext()

const GlobalContextProvider = (props) => {
  const [ avatar, setAvatar] = useState(null)
  const [ items, setItems ] = useState([])            //aside items
  const [ itemIndex, setItemIndex ] = useState()      //currently selected item index
  const [ activeKey, setActiveKey ] = useState('conversations')
  const [ links, setLinks ] = useState({})            // my friends, subscriptions and my 
                                                      // chatrooms current state
                                                      // {id: {online: <false | true>,
                                                      //       msgs:   <false | number> }}
  const [ notifications, setNotifications ] = useState()  // number of current notifications
  const { menu, setMenu } = useMenu()
  const { credentials, saveCredentials, deleteCredentials } = useStorage()
  const { socketRef, socketMessage, socketSendMessage } = useWebsocket()

  return (
      <context.Provider value={{  menu, setMenu, 
                                  avatar, setAvatar,
                                  activeKey, setActiveKey, 
                                  items, setItems,
                                  itemIndex, setItemIndex }}>
        <GlobalCredentialsContext.Provider value={{ credentials, saveCredentials, deleteCredentials }} >
          <GlobalWebsocketContext.Provider value={{ socketRef, socketMessage, socketSendMessage }}>
            <GlobalNotificationsContext.Provider value={{ notifications, setNotifications }} >
              <GlobalLinksContext.Provider value={{ links, setLinks }} >
                {props.children}
              </GlobalLinksContext.Provider>
            </GlobalNotificationsContext.Provider>
          </GlobalWebsocketContext.Provider>
        </GlobalCredentialsContext.Provider>
      </context.Provider>
  )
}

export default GlobalContextProvider