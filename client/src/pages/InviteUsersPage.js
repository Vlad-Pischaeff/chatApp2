import React, { useState, useContext, useEffect } from 'react'
import ElementList from '../components/ElementList'
import { Modal, Button, Badge } from 'rsuite'
import { context } from '../context/context'
import { useHttp } from '../hooks/http.hook'
import { useHistory, useLocation } from 'react-router-dom'

const styles = {
  body: { margin: '1rem 0', width: '20rem' },
  list: { overflow: 'hidden', },
}

export default function InviteUsersPage() {
  let history = useHistory()
  let location = useLocation()

  const [selectMany, setSelectMany] = useState({})
  const [show, setShow] = useState(true)
  const { request, loading, error, header } = useHttp()
  const { setItems, activeKey, items, itemIndex } = useContext(context)
  const [ friends, setFriends ] = useState()

  useEffect(() => {
    const getFriends = async () => {
      const API = '/api/auth/friends'
      const data = await request(API, 'GET', null, header)
      setFriends(data)
    }
    getFriends()
  }, [])

  const closeWindow = () => {
    setSelectMany({})
    setShow(false)
    history.goBack()
  }

  const OK_onClick = async () => {
    let roomId = items[itemIndex]._id
    console.log('room id ...', roomId)
    const API = `/api/room/invite/${roomId}`
    const body = { 'friends': selectMany }
    const data = await request(API, 'PATCH', body, header)
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
                      data={friends} style={styles.list} multi='true' />
      </Modal.Body>
      <Modal.Footer>
        <Badge content={Object.keys(selectMany).length > 0 ? Object.keys(selectMany).length : false} >
          <div></div>
        </Badge>
        <Button onClick={OK_onClick} appearance="primary">
          Invite
        </Button>
        <Button onClick={closeWindow} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}