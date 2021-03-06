import React, { useContext } from  'react'
import { Popover, Button, Whisper, Icon } from "rsuite"
import { context, useGlobalWebsocketContext, useGlobalLinksContext } from '../context/context'
import { useHttp } from '../hooks/http.hook'
let trigger = null

const styles = { 
  icon: { margin: '0 0.2rem',  }, 
}

const Speaker = (props) => {
  const { item, setSelected, ...arr } = props
  const { socketSendMessage } = useGlobalWebsocketContext()
  const { links, setLinks } = useGlobalLinksContext()
  const { setItems, setItemIndex } = useContext(context)
  const { request } = useHttp()

  const handlerOnClick = async () => {
    trigger.hide()
    const body = { private: false }    
    const API = `/api/room/${item._id}`
    const data = await request(API, 'DELETE', body)
    // reset selections and itemIndex after delete chat 
    undefineItemIndex()
    setSelected({})
    setItems(data)
    deleteLink(item._id)
    // send message to users to update list of chatrooms
    socketSendMessage({ 'chatdel': item.followers })
  }

  const deleteLink = (item) => {
    const obj = { ...links }
    delete obj[item]
    setLinks(obj)
  }

  const undefineItemIndex = () => {
    setItemIndex(undefined)
  }

  return (
    <Popover title="Delete chat room ..." {...arr}>
      <p>Do You want to delete <strong> "{item.name}" </strong> ?</p>
      <hr/>
      <Button appearance="primary" onClick={handlerOnClick}>Yes</Button>
      <Button onClick={() => trigger.hide()}>No</Button>
    </Popover>
  )
}

export default function PopoverDelChat(props) {
  const { placement, ...arr } = props
  const triggerRef = ref => (trigger = ref)

  return (
    <Whisper  trigger="click" 
              triggerRef={triggerRef}
              placement={placement} 
              speaker={<Speaker {...arr.props} />} >
      <Icon icon="close" style={styles.icon} /> 
    </Whisper>
  )
}