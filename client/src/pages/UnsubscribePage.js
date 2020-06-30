import React, { useState, useContext } from 'react'
import ElementList from '../components/ElementList'
import { Modal, Button } from 'rsuite'
import { context } from '../context/context'
import { useHttp } from '../hooks/http.hook'
import { useHistory } from 'react-router-dom'

const styles = {
  body: { margin: '1rem 0', width: '20rem' },
  list: { overflow: 'hidden', },
}

export default function UnsubscribePage() {
  let history = useHistory()

  const [show, setShow] = useState(true)
  const { request, loading, error } = useHttp()
  const { headers, items, setItems, activeKey, itemIndex, setItemIndex } = useContext(context)

  const closeWindow = () => {
    setShow(false)
    history.goBack()
  }

  const OK_onClick = async () => {
    let id = items[itemIndex]._id
    const API = (activeKey === 'conversations') 
      ? `/api/auth/unfollow/${id}` 
      : `/api/room/unfollow/${id}`
    const data = await request(API, 'PATCH', null, headers)
    setItems(data)
    closeWindow()
  }

  return (
    <Modal show={show} onHide={closeWindow} size='xs' >
      <Modal.Header>
        <Modal.Title>Unsubscribe room or user ...</Modal.Title>
      </Modal.Header>
      <Modal.Body style={styles.body} >
        <ElementList  data={items[itemIndex] ? [items[itemIndex]] : []} style={styles.list} multi='false' 
                      selected={[]} setSelected={() => {}} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={OK_onClick} appearance="primary">
          Unsubscribe
        </Button>
        <Button onClick={closeWindow} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}