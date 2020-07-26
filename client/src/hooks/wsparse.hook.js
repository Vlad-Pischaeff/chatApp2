import { useState, useContext, useEffect } from 'react'
import { context } from '../context/context'

export const useWSParse = () => {
  const { links, setLinks, items, itemIndex, socketMessage, credentials, notifications, setNotifications } = useContext(context)
  const [ sockMsg, setSockMsg ] = useState()

  useEffect(() => {
    let obj = {...links}
    let key

    // if user is our friend and hi is online, then set property obj[key]['online'] = true
    if (key = socketMessage.online) {
      if (obj[key] && obj[key]['online'] === false) {
        obj[key] = { ...obj[key], 'online' : true }
        setLinks(obj)
        setSockMsg({ 'online': key })
      }
    }

    // if user is our friend and hi is offline, then set property obj[key]['online'] = false
    if (key = socketMessage.offline) {
      if (obj[key] && obj[key]['online'] === true) {
        obj[key] = { ...obj[key], 'online' : false }
        setLinks(obj)
        setSockMsg({ 'offline': key })
      }
    }
    
    // if room is in our subscription or we own it,
    // then set property obj[key]['msgs'] = as counter of new messages to room
    if (key = socketMessage.toroom) {
      if (obj[key] && 
          (itemIndex === undefined || key !== items[itemIndex]._id)) {
        let val = obj[key]['msgs'] === false 
          ? 1 
          : +obj[key]['msgs'] + 1
        obj[key] = { ...obj[key], 'msgs': val }
        setLinks(obj)
        setSockMsg({ 'msgs': key })
      }
    }
  
    // if user is our friend,
    // then set property obj[key]['msgs'] = as counter of new messages from user
    if ((key = socketMessage.fromuser) && socketMessage.to === credentials.userId) {
      if (obj[key] &&
          (itemIndex === undefined || key !== items[itemIndex]._id)) {
        let val = obj[key]['msgs'] === false 
          ? 1 
          : +obj[key]['msgs'] + 1
        obj[key] = { ...obj[key], 'msgs': val }
        setLinks(obj)
        setSockMsg({ 'msgs': key })
      } 
    }   

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
        if (notifications) {
          setNotifications(notifications + 1)
        } else {
          setNotifications(1)
        }
        console.log('I have ben added to friend by ...', socketMessage.friend, notifications)
      }
    }

    return () => setSockMsg()
  }, [socketMessage])

  return { sockMsg }
}