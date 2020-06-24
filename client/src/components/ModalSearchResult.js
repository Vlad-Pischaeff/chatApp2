import React, { useState } from 'react'
import ElementList from './ElementList'
import { Modal, Button, Badge } from 'rsuite'

const styles = {
  body: { margin: '1rem 0', width: '20rem' },
  list: { overflow: 'hidden', },
}

function ModalSearchResult({show, setShow, data}) {
  const [selectMany, setSelectMany] = useState({})

  const Hide = () => {
    setSelectMany({})
    setShow(false)
  }

  const OK_onClick = () => {
    Hide()
  }

  return (
    <Modal show={show} onHide={Hide} size='xs' >
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
        <Button onClick={Hide} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalSearchResult