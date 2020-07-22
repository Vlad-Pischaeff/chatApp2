import React, { useContext } from  'react'
import { Popover, Button, Whisper, Icon } from "rsuite"
import { context } from '../context/context'
import { useHttp } from '../hooks/http.hook'
let trigger = null

const styles = { 
  icon: { margin: '0 0.2rem',  }, 
}

const Speaker = ({ item, setSelected, ...props }) => {
  const { setItems, links, setLinks, setItemIndex } = useContext(context)
  const { request } = useHttp()

  const handlerOnClick = async () => {
    trigger.hide()    
    const API = `/api/room/unfollow/${item._id}`
    const data = await request(API, 'PATCH')
    // reset selections and itemIndex after delete chat 
    undefineItemIndex()
    setSelected({})
    setItems(data)
    deleteLink(item._id)
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
    <Popover title="Unsubscribe from chat room ..." {...props}>
      <p>Do You want to unsubscribe from <strong> "{item.name}" </strong> ?</p>
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
              speaker={<Speaker {...arr} />} >
      <Icon icon="close" style={styles.icon} /> 
    </Whisper>
  )
}