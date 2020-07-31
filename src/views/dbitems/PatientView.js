import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Modal,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
} from "react-bootstrap";
import requests from "../../utils/requests";
import { LoadingContext } from "../../shared/LoadingContext";
import EditPatientForm from "../../components/forms/EditPatientForm";
export default function PatientView() {
  const { loading, setLoading } = useContext(LoadingContext);
  const [patients, setPatients] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [currentPatientEdited, setCurrentPatientEdited] = useState(0);

  useEffect(() => {
    if (loading === true) {
      console.log('load patients')
      fetchPatients();
    }
  }, [loading]);

  let fetchPatients = async () => {
    let result = await requests.getAllPatients();
    if (result) {
      setPatients(result);
    }
     setLoading(false);
  };
  const handleCloseEdit = () => {
    setShowEdit(false);
  };
  const handleShowEdit = (patient) => {
    setCurrentPatientEdited(patient);
    setShowEdit(true);
  };
  return (
    <ListGroup>
      <ListGroupItem style={styles.header}>
        first_name last_name, birthdate, gender, outcome(plc_status)
      </ListGroupItem>
      {patients.map((patient) => (
        <ListGroupItem key={patient.id} style={{backgroundColor: "#ECEFF4",}}>
          <Row>
            <Col lg={10} style={styles.columnLeft}>
              {patient.first_name} {patient.last_name},{" "}
              {new Date(patient.birthdate).toLocaleDateString("en-GB")}
              , {patient.gender}, {patient.outcome.plc_status}
            </Col>
            <Col lg={2}>
              <Row style={styles.columnRight}>
                <Button
                  className="btn-sm"
                  style={{ width: 70 }}
                  onClick={() => handleShowEdit(patient)}
                >
                  Edit
                </Button>
              </Row>
            </Col>
          </Row>{" "}
        </ListGroupItem>
      ))}
      <Modal centered show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditPatientForm
            handleCloseEdit={handleCloseEdit}
            patient={currentPatientEdited}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </ListGroup>
  );
}

const styles = {
  header: {
    textAlign: "left",
    fontWeight: "bold",
    backgroundColor: "#ECEFF4",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  columnLeft: {
    textAlign: "left",
  },
  columnRight: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
};
