import React, { useState, useContext } from 'react'
import { Modal, Button } from 'rsuite'
import { UploadImage } from './UploadImage'
import { context } from '../context/context'

const styles = {
  body: { margin: '1rem 0' }
}

export default function ModalSelectImage({show, setShow}) {
  const [image, setImage] = useState(null)
  const { setAvatar } = useContext(context)

  const OK_onClick = () => {
    setAvatar(image)
    setShow(false)
  }

   return (
    <Modal show={show} onHide={() => setShow(false)} >
      <Modal.Header>
        <Modal.Title>Choose file for image ...</Modal.Title>
      </Modal.Header>
      <Modal.Body style={styles.body} >
        <UploadImage setImage={setImage} />
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