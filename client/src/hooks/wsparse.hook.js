import { useState, useContext, useEffect } from 'react'
import { context, useGlobalWebsocketContext, useGlobalCredentialsContext, useGlobalNotificationsContext, useGlobalLinksContext } from '../context/context'

export const useWSParse = () => {
  const { socketMessage, setSocketMessage } = useGlobalWebsocketContext()
  const { credentials } = useGlobalCredentialsContext()
  const { notifications, setNotifications } = useGlobalNotificationsContext()
  const { links, setLinks } = useGlobalLinksContext()
  const { items, itemIndex } = useContext(context)
  const [ sockMsg, setSockMsg ] = useState()

  useEffect(() => {
    let obj = {...links}
    let key
    const {action, id, state, to, from} = socketMessage

    const states = {
      online: function () {
        obj[id] = { ...obj[id], 'online' : state }
        setLinks(obj)
      },
      friends_msg: function() {
        if (to === credentials.userId && itemIndex === undefined) {
          let counter = obj[from]['msgs']
          obj[from]['msgs'] = !counter ? +1 : counter + 1
          setLinks(obj)
        }
      },
      rooms_msg: function() {
        // console.log('rooms_msg ... ', items, items.map(i => i._id))
        if (items.map(i => i._id).includes(to) && itemIndex === undefined) {
          let counter = obj[to]['msgs']
          obj[to]['msgs'] = !counter ? +1 : counter + 1
          setLinks(obj)
        }
      }
    }
    
    states[action]?.()
    
    // if user is our friend and hi is online, then set property obj['state'] = true
    // if (action === 'online') {
    //   obj[id] = { ...obj[id], 'online' : state }
    //   setLinks(obj)
    //   console.log('LINKS ... ', obj)
    // }
    
    // if user is our friend, and not selected in WebChat interface
    // then set property obj[key]['msgs'] = as counter of new messages from user
    // if (action === 'friends_msg') {
    //   if (to === credentials.userId && itemIndex === undefined) {
    //     let counter = obj[from]['msgs']
    //     obj[from]['msgs'] = !counter 
    //                           ? +1 
    //                           : counter + 1
    //     setLinks(obj)
    //   }
    //   // setSockMsg({ 'msgs': from })
    // }
    
    // if room is in our subscription or we own it,
    // then set property obj[key]['msgs'] = as counter of new messages to room
    // if (action === 'rooms_msg') {
    //   console.log('rooms_msg ... ', items)
    //   if (to === items[itemIndex]._id && itemIndex === undefined) {
    //     let counter = obj[to]['msgs']
    //     obj[to]['msgs'] = !counter 
    //                           ? +1 
    //                           : counter + 1
    //     setLinks(obj)
    //     // setSockMsg({ 'msgs': key })
    //   }
    // }
  
    // if user add me to his friends
    if (key = socketMessage.invite) {
      if (key === credentials.userId) {
        console.log('I am invited by ...', socketMessage.friend, key)
      }
    }

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