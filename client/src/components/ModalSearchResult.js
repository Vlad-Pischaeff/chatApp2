import React from 'react'
import Radium from 'radium'
import ElementList from './ElementList'
import { Modal, Button } from 'rsuite'

const styles = {
  body: { margin: '1rem 0', width: '20rem' },
  list: { overflow: 'hidden' }
}

function ModalSearchResult({show, setShow, data}) {
  const OK_onClick = () => {
    console.log('OK')
    setShow(false)
  }

  return (
    <Modal show={show} onHide={() => setShow(false)} size='xs' >
      <Modal.Header>
        <Modal.Title>Choose room or user ...</Modal.Title>
      </Modal.Header>
      <Modal.Body style={styles.body} >
        <ElementList data={data} style={styles.list} multi='true' />
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

export default Radium(ModalSearchResult)