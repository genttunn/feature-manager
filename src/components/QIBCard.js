import React, { useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import EditQIBForm from "./forms/EditQIBForm";
import globalComponents from "../styles/globalComponents";
export default function QIBCard({ qib, fetchQIBFeature, deleteQIB}) {
  const [currentQIBEdited, setCurrentQIBEdited] = useState(0);
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => {
    setShowEdit(false);
  };
  const handleShowEdit = (qibID) => {
    setCurrentQIBEdited(qibID);
    setShowEdit(true);
  };
  return (
    <React.Fragment>
      {globalComponents}
      <Row>
        <Col lg={9}>
          <span><b>ID : </b> {qib.id}</span>
          <br></br>
          <span><b>Name : </b> {qib.name}</span>
          <br></br>
          <span><b>Description : </b> {qib.description}</span>
          <br></br>
          <span><b>Date: </b>{qib.time_stamp}</span>
          <br></br>
          <span><b>outcome_column: </b>{qib.outcome_column}</span>
        </Col>
        <Col
        lg={3}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="nord-robin"
            className="btn-sm btn-block "
            style={{ ...styles.boldText, width: 70 }}
            onClick={() => fetchQIBFeature(qib)}
          >
            Load
          </Button>
          <Button
            variant="nord-pink"
            className="btn-sm btn-block "
            style={{ ...styles.boldText, width: 70 }}
            onClick={() => handleShowEdit(qib.id)}
          >
            Edit
          </Button>
          <Button
            variant="nord-orange"
            className="btn-sm btn-block "
            style={{ ...styles.boldText, width: 70 }}
            onClick={() => deleteQIB(qib)}
          >
            Delete
          </Button>
        </Col>
      </Row>
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit QIB</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditQIBForm
            handleCloseEdit={handleCloseEdit}
            qibID={currentQIBEdited}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
const styles = {
  boldText: {
    fontWeight: "bold",
    borderRadius: 20,
  },
};
