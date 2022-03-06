import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap'

function ModalDialogSelect({ show, modalHeading, modalContent, handleClose, handleAnswerA, handleAnswerB, answerA, answerB, footer = true}) {

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
        {footer && <Modal.Footer>
          <Button size="xxl" variant="secondary" onClick={handleClose}>
            Zavřít
          </Button>
          <Button size="xxl" variant="primary" onClick={handleAnswerA}>
            {answerA}
          </Button>
          <Button size="xxl" variant="warning" onClick={handleAnswerB}>
            {answerB}
          </Button>
        </Modal.Footer>
        }

      </Modal>
    </>
  )
}

export default ModalDialogSelect;