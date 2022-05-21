import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './modal.css';


const ModalComp = (props) => {

    const modalHandlerMethod = (bool) => {
        props.modalHandler(bool);
    };
   
    return (
        <Modal className='modal_container'
            show={props.modalShow}
            onHide={() => modalHandlerMethod(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
        >
            <Modal.Body>
            {props.modalContent}
            </Modal.Body>
            <Modal.Footer>
            <Button className='primaryBtn' onClick={() => modalHandlerMethod(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
      );

}

export default ModalComp;