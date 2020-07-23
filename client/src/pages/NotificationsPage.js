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

export default function NotificationsPage() {
  let history = useHistory()
  let location = useLocation()

  const [ selectMany, setSelectMany ] = useState({})
  const [ candidates, setCandidates ] = useState([])
  const [ show, setShow ] = useState(true)
  const { request } = useHttp()
  const { setItems, activeKey, links, setLinks, socketSendMessage, credentials } = useContext(context)

  const closeWindow = () => {
    setSelectMany({})
    setShow(false)
    history.goBack()
  }

  const OK_onClick = async () => {
    // const API = (activeKey === 'conversations') ? '/api/auth/friends' : '/api/room/follow'
    // const body = { 'friends': selectMany }
    // const data = await request(API, 'PATCH', body)
    // console.log(`${API} patch result ...`, data, selectMany)
    // setItems(data)
    // fillLinks(data)
    // // send notification to users added to friends
    // if ((selectMany.length !== 0) && (activeKey === 'conversations')) {
    //   let arr = Object.values(selectMany)
    //   arr.forEach(item => {
    //     socketSendMessage({ 'invite': item, 'friend': credentials.userId })
    //   })
    // }
    // closeWindow()
  }

  const fillLinks = (data) => {
    // let obj = {}
    // data.forEach(e =>  obj[e._id] = { 'msgs': false, 'online': false })
    // setLinks({ ...links, ...obj })
  }
  console.log('NotificationsPage ...', show)
  return (
    <Modal show={show} onHide={closeWindow} size='xs' >
      <Modal.Header>
        <Modal.Title>These users have added You to friends ...</Modal.Title>
      </Modal.Header>
      <Modal.Body style={styles.body} >
        <ElementList  selected={selectMany} setSelected={setSelectMany} 
                      data={candidates} style={styles.list} multi='true' modal='true' />
      </Modal.Body>
      <Modal.Footer>
        <Badge content={ Object.keys(selectMany).length > 0 ? Object.keys(selectMany).length : false } >
          <></>
        </Badge>
        <Button onClick={OK_onClick} appearance="primary">
          Subcsribe
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