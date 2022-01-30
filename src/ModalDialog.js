import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap'

function ModalDialog({ show, modalHeading, modalContent, handleAccept, handleClose}) {

  return(
    <>
      <Modal show={show}
             onHide={handleClose}
             size="lg"
             aria-labelledby="contained-modal-title-vcenter"
             centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={{fontSize: 30}}>{modalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{fontSize: 25}}>{modalContent}</Modal.Body>
        <Modal.Footer>
          <Button size="xxl" variant="secondary" onClick={handleClose}>
            Zavřít
          </Button>
          <Button size="xxl" variant="primary" onClick={handleAccept}>
            Potvrtdit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalDialog;