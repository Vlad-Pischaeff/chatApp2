import React from 'react'
import { Modal, Button } from 'rsuite'
import { UploadUserAvatars } from './UploadUserAvatar'

export default function ModalUserAvatars({show, setShow}) {
  return (
    <Modal show={show} onHide={() => setShow(false)} >
      <Modal.Header>
        <Modal.Title>Choose file for avatar</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <UploadUserAvatars />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShow(false)} appearance="primary">
          Ok
        </Button>
        <Button onClick={() => setShow(false)} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}