import React, { useState, useEffect } from 'react'
import NotificationsElementsList from '../components/NotificationsElementsList'
import { Modal, Button } from 'rsuite'
import { useHttp } from '../hooks/http.hook'
import { useHistory } from 'react-router-dom'

const styles = { body: { margin: '1rem 0', width: '20rem' }, }

export default function NotificationsPage() {
  let history = useHistory()

  const [ candidates, setCandidates ] = useState([])
  const [ show, setShow ] = useState(true)
  const { request } = useHttp()

  // get users information while open window
  useEffect(() => {
    getNewNotifications()
      .then(e => getUsersProfiles(e))
  }, [])

  const closeWindow = () => {
    setShow(false)
    history.goBack()
  }

  const getUsersProfiles = async (notes) => {
    let arr = [...notes]
    let friends = arr.map(e => e.from)
    let body = { 'users': friends }
    let data = await request('/api/auth/users', 'POST', body)
    let newData = combiningProfilesAndNotifications(arr, data)
    // console.log('NotificationsPage... getUsersProfiles', newData)
    setCandidates(newData)
  }
  // merge arrays of UserProfiles and Notifications
  // arr1 - Notifications
  // arr2 - UserProfiles
  const combiningProfilesAndNotifications = (arr1, arr2) => {
    return arr1.map(e => {
      let item = arr2.filter(n => n._id === e.from)
      e.login = item[0].login
      e.avatar = item[0].avatar
      return e
    })
  }

  const getNewNotifications = async () => {
    return await request('/api/notification/new', 'GET')
  }

  const getAllNotificaions = async () => {
    let data = await request('/api/notification/all', 'GET')
    getUsersProfiles(data)
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
        <Button onClick={getAllNotificaions} appearance="primary">
          Show All
        </Button>
        <Button onClick={closeWindow} appearance="default">
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  )
}