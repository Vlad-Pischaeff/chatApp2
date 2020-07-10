import React, { useContext } from  'react'
import { Popover, Button, Whisper, Icon } from "rsuite"
import { context } from '../context/context'
import { useHttp } from '../hooks/http.hook'
let trigger = null

const styles = { icon: { margin: '0 0.2rem',  }, }

const Speaker = ({ content, item, ...props }) => {
  const { setItems } = useContext(context)
  const { request } = useHttp()

  const handlerOnClick = async () => {
    trigger.hide()    
    const API =`/api/auth/unfollow/${item}`
    const data = await request(API, 'PATCH')
    setItems(data)
  }

  return (
    <Popover title="Unsubscribe from user ..." {...props}>
      <p>Do You want to unsubscribe from <strong> "{content}" </strong> ?</p>
      <hr/>
      <Button appearance="primary" onClick={handlerOnClick}>Yes</Button>
      <Button onClick={() => trigger.hide()}>No</Button>
    </Popover>
  )
}

export default function PopoverDelUser({ content, placement, item }) {
  const triggerRef = ref => (trigger = ref)

  return (
    <Whisper  trigger="click" 
              triggerRef={triggerRef}
              placement={placement} 
              speaker={<Speaker content={content} item={item} />} >
      <Icon icon="close" style={styles.icon} /> 
    </Whisper>
  )
}