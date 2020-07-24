import React, { useState, useContext, useEffect } from 'react'
import NotificationsElementsList from '../components/NotificationsElementsList'
import { Modal, Button } from 'rsuite'
import { context } from '../context/context'
import { useHttp } from '../hooks/http.hook'
import { useHistory, useLocation } from 'react-router-dom'

const styles = { body: { margin: '1rem 0', width: '20rem' }, }

export default function NotificationsPage() {
  let history = useHistory()
  let location = useLocation()

  const [ candidates, setCandidates ] = useState([])
  const [ show, setShow ] = useState(true)
  const { request } = useHttp()
  const { setItems, activeKey, links, setLinks, socketSendMessage, credentials } = useContext(context)

  // get users information while open window
  useEffect(() => {
    getUsersProfiles().then(e => setCandidates(e))
  }, [])

  const closeWindow = () => {
    setShow(false)
    history.goBack()
  }

  const OK_onClick = async () => {
    closeWindow()
  }

  const getUsersProfiles = async () => {
    let arr = [...location.state.notifications]
    let friends = arr.map(e => e.from)
    let body = { 'users': friends }
    return await request('/api/auth/users', 'POST', body)
  }

  return (
    <Modal show={show} onHide={closeWindow} size='xs' >
      <Modal.Header>
        <Modal.Title>These users have added You to friends ...</Modal.Title>
      </Modal.Header>
      <Modal.Body style={styles.body} >
        <NotificationsElementsList data={candidates} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={OK_onClick} appearance="primary">
          Subcsribe All
        </Button>
        <Button onClick={OK_onClick} appearance="primary">
          Clear
        </Button>
        <Button onClick={closeWindow} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}