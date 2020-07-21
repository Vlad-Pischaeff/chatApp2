import { useState, useContext, useEffect } from 'react'
import { context } from '../context/context'

export const useWSParse = () => {
  const { links, setLinks, items, itemIndex, socketMessage, credentials } = useContext(context)
  const [ success, setSuccess ] = useState(false)

  useEffect(() => {
    let obj = {...links}
    let key

    // if user is our friend and hi is online, then set property obj[key]['online'] = true
    if (key = socketMessage.online) {
      if (obj[key] && obj[key]['online'] === false) {
        obj[key] = { ...obj[key], 'online' : true }
        setLinks(obj)
        setSuccess(true)
      }
    }

    // if user is our friend and hi is offline, then set property obj[key]['online'] = false
    if (key = socketMessage.offline) {
      if (obj[key] && obj[key]['online'] === true) {
        obj[key] = { ...obj[key], 'online' : false }
        setLinks(obj)
        setSuccess(true)
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
        setSuccess(true)
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
        setSuccess(true)
      } 
    }   

    // if user add me to his friends
    if (key = socketMessage.invite) {
      if (key === credentials.userId) {
        console.log('I am invited by ...', socketMessage.friend, key)
      }
    }

    return () => setSuccess(false)
  }, [socketMessage])

  return { success }
}