import React, { useState } from 'react'
import ElementList from './ElementList'
import { Modal, Button, Badge } from 'rsuite'

const styles = {
  body: { margin: '1rem 0', width: '20rem' },
  list: { overflow: 'hidden', },
}

function ModalSearchResult({show, setShow, data}) {
  const [selectMany, setSelectMany] = useState({})

  const OK_onClick = () => {
    console.log('OK')
    setShow(false)
  }
  // console.log('length ...', Object.keys(selectMany).length, selectMany)
  return (
    <Modal show={show} onHide={() => setShow(false)} size='xs' >
      <Modal.Header>
        <Modal.Title>Choose room or user ...</Modal.Title>
      </Modal.Header>
      <Modal.Body style={styles.body} >
        <ElementList selected={selectMany} setSelected={setSelectMany} data={data} style={styles.list} multi='true' />
      </Modal.Body>
      <Modal.Footer>
        <Badge content={Object.keys(selectMany).length > 0 ? Object.keys(selectMany).length : false} >
          <div></div>
        </Badge>
        <Button onClick={OK_onClick} appearance="primary">
          Subcsribe
        </Button>
        <Button onClick={() => setShow(false)} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalSearchResult