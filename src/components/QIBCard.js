import React, { useState, useContext } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import EditQIBForm from "./forms/EditQIBForm";
import globalComponents from "../styles/globalComponents";
import { themeDark, themeLight } from "../styles/globalStyles";
import { DarkmodeContext } from "../shared/DarkmodeContext";
export default function QIBCard({ qib, fetchQIBFeature, deleteQIB }) {
  const [currentQIBEdited, setCurrentQIBEdited] = useState(0);
  const [showEdit, setShowEdit] = useState(false);
  const { darkmode } = useContext(DarkmodeContext);
  const theme = darkmode === true ? themeDark : themeLight;
  const handleCloseEdit = () => {
    setShowEdit(false);
  };
  const handleShowEdit = (qib) => {
    setCurrentQIBEdited(qib);
    setShowEdit(true);
  };
  const styles = {
    boldText: {
      fontWeight: "bold",
      borderRadius: 18,
    },
  };
  return (
    <React.Fragment>
      {globalComponents}
      <Row>
        <Col lg={9}>
          <span>
            <b>ID : </b> {qib.id}
          </span>
          <br></br>
          <span>
            <b>Name : </b> {qib.name}
          </span>
          <br></br>
          <span>
            <b>Description : </b> {qib.description}
          </span>
          <br></br>
          <span>
            <b>Date: </b>
            {qib.time_stamp}
          </span>
          <br></br>
          <span>
            <b>outcome_column: </b>
            {qib.outcome_column}
          </span>
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
            onClick={() => handleShowEdit(qib)}
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
      <Modal centered show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton style={theme.inputField}>
          <Modal.Title>Edit QIB</Modal.Title>
        </Modal.Header>
        <Modal.Body style={theme.box}>
          <EditQIBForm
            handleCloseEdit={handleCloseEdit}
            qib={currentQIBEdited}
          />
        </Modal.Body>
        <Modal.Footer style={theme.inputField}>
          <Button
            variant="nord-orange"
            style={styles.boldText}
            onClick={handleCloseEdit}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
