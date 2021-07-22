import { useState, useContext, useEffect } from 'react'
import { context, useGlobalWebsocketContext, useGlobalCredentialsContext, useGlobalNotificationsContext, useGlobalLinksContext } from '../context/context'

export const useWSParse = () => {
  const { socketMessage } = useGlobalWebsocketContext()
  const { credentials } = useGlobalCredentialsContext()
  const { notifications, setNotifications } = useGlobalNotificationsContext()
  const { links, setLinks } = useGlobalLinksContext()
  const { items, itemIndex } = useContext(context)
  const [ sockMsg, setSockMsg ] = useState()

  const incrementCounter = (c) => {
    return c ? c + 1 : +1
  }

  useEffect(() => {
    let obj = {...links}
    let key
    const {action, id, state, to, from} = socketMessage

    const states = {
      // if user is our friend and hi is online, then set property obj['state'] = true
      online: function () {
        obj[id] = { ...obj[id], 'online' : state }
        setLinks(obj)
      },
      // if user is our friend, and NOT SELECTED in WebChat interface
      // then set property obj[key]['msgs'] = as counter of new messages from user      
      friends_msg: function() {
        if (itemIndex === undefined || items[itemIndex]._id !== from ) {
          obj[from]['msgs'] = incrementCounter(obj[from]['msgs'])
          setLinks(obj)
        }
      },
      // if room is in our subscription or we own it and NOT SELECTED,
      // then set property obj[key]['msgs'] = as counter of new messages to room
      rooms_msg: function() {
        if (itemIndex === undefined || items[itemIndex]._id !== to) {
          obj[to]['msgs'] = incrementCounter(obj[to]['msgs'])
          setLinks(obj)
        } 
      }
    }
    
    states[action]?.()
  
    // if user add me to his friends
    // if (key = socketMessage.invite) {
    //   if (key === credentials.userId) {
    //     console.log('I am invited by ...', socketMessage.friend, key)
    //   }
    // }

    // if user add me to his private chatroom
    if (key = socketMessage.privchatadd) {
      let obj = Object.values(key)
      if (obj.indexOf(credentials.userId) !== -1)
        setSockMsg({ 'privchatadd': credentials.userId })
        console.log('I am invited to privchat ...', key)
    }

    // if user delete his private chatroom
    if (key = socketMessage.privchatdel) {
      if (key.indexOf(credentials.userId) !== -1)
        setSockMsg({ 'privchatdel': credentials.userId })
        console.log('I am removed from privchat ...', key)
    }

    // if user delete his public chatroom
    if (key = socketMessage.chatdel) {
      if (key.indexOf(credentials.userId) !== -1)
        setSockMsg({ 'chatdel': credentials.userId })
        console.log('I am removed from public chat ...', key)
    }

    // if user invited by another one, receive notification
    if (key = socketMessage.invite) {
      if (key === credentials.userId) {
        setSockMsg({ 'invite': socketMessage.friend })
        notifications
          ? setNotifications(notifications + 1)
          : setNotifications(1)
        console.log('I have ben added to friend by ...', socketMessage.friend, notifications)
      }
    }

    return () => setSockMsg()
  }, [socketMessage])

  // console.log('WsParse socket message ...', sockMsg)
  return { sockMsg }
}