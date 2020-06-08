import React, { useState, useContext } from 'react'
import { Modal, Button } from 'rsuite'
import { UploadUserAvatars } from './UploadUserAvatar'
import { context } from '../context/context'

const styles = {
  body: {
    margin: '1rem 0'
  }
}
export default function ModalUserAvatars({show, setShow}) {
  const [image, setImage] = useState(null)
  const { setUserAvatar } = useContext(context)

  const OK_onClick = () => {
    setUserAvatar(image)
    setShow(false)
  }

   return (
    <Modal show={show} onHide={() => setShow(false)} >
      <Modal.Header>
        <Modal.Title>Choose file for avatar</Modal.Title>
      </Modal.Header>
      <Modal.Body style={styles.body} >
        <UploadUserAvatars setImage={setImage} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={OK_onClick} appearance="primary">
          Ok
        </Button>
        <Button onClick={() => setShow(false)} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}