import React from "react";
import { Modal } from "react-bootstrap";

const ModalComponent = ({
  show,
  footer,
  header,
  size,
  children,
  handleClose,
}) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size={size}
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      {header && (
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{header}</Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body>{children}</Modal.Body>
      {footer && (
        <Modal.Footer>
          <button>Yes</button>
          <button>No</button>
        </Modal.Footer>
      )}
    </Modal>
  );
};


export default ModalComponent;