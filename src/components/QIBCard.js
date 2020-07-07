import React, { useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import EditQIBForm from "./forms/EditQIBForm";
import globalComponents from "../styles/globalComponents";
export default function QIBCard({ qib, fetchQIBFeature }) {
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
        <Col lg={8}>
          <span>ID : {qib.id}</span>
          <br></br>
          <span>Name : {qib.name}</span>
          <br></br>
          <span>Description : {qib.description}</span>
          <br></br>
          <span>Date: {qib.time_stamp}</span>
          <br></br>
          <span>outcome_columns: {qib.outcome_column}</span>
        </Col>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent:'center'
          }}
        >
  
            <Button
              variant = "nord-orange"
              className="btn btn-block"
              style={{...styles.boldText, width: 70}}
              onClick={() => handleShowEdit(qib.id)}
            >
              Edit
            </Button>
        
      
            <Button
            variant = "nord-robin"
              className="btn btn-block"
              style={{...styles.boldText, width: 70}}
              onClick={() => fetchQIBFeature(qib)}
            >
              Load
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
  boldText:{
    fontWeight:'bold'
  }
}