import React, { useState, useContext } from 'react'
import ElementList from '../components/ElementList'
import { Modal, Button, Badge } from 'rsuite'
import { context } from '../context/context'
import { useHttp } from '../hooks/http.hook'
import { useHistory, useLocation } from 'react-router-dom'

const styles = {
  body: { margin: '1rem 0', width: '20rem' },
  list: { overflow: 'hidden', },
}

export default function SearchResultPage() {
  let history = useHistory()
  let location = useLocation()

  const [selectMany, setSelectMany] = useState({})
  const [show, setShow] = useState(true)
  const { request, loading, error } = useHttp()
  const { headers, setItems, activeKey } = useContext(context)

  const closeWindow = () => {
    setSelectMany({})
    setShow(false)
    history.goBack()
  }

  const OK_onClick = async () => {
    const API = (activeKey === 'conversations') ? '/api/auth/friends' : '/api/room/follow'
    const body = { 'friends': selectMany }
    const data = await request(API, 'PATCH', body, headers)
    console.log(`${API} patch result ...`, data)
    setItems(data)
    closeWindow()
  }

  return (
    <Modal show={show} onHide={closeWindow} size='xs' >
      <Modal.Header>
        <Modal.Title>Choose room or user ...</Modal.Title>
      </Modal.Header>
      <Modal.Body style={styles.body} >
        <ElementList  selected={selectMany} setSelected={setSelectMany} 
                      data={location.state.result} style={styles.list} multi='true' />
      </Modal.Body>
      <Modal.Footer>
        <Badge content={Object.keys(selectMany).length > 0 ? Object.keys(selectMany).length : false} >
          <div></div>
        </Badge>
        <Button onClick={OK_onClick} appearance="primary">
          Subcsribe
        </Button>
        <Button onClick={closeWindow} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}