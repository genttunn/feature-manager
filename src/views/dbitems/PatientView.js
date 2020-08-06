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
import globalComponents from "../../styles/globalComponents";
import { DarkmodeContext } from "../../shared/DarkmodeContext";
import { themeDark, themeLight } from "../../styles/globalStyles";

export default function PatientView() {
  const { loading, setLoading } = useContext(LoadingContext);
  const [patients, setPatients] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [currentPatientEdited, setCurrentPatientEdited] = useState(0);
  const { darkmode } = useContext(DarkmodeContext);
  const theme = darkmode === true ? themeDark : themeLight;
  useEffect(() => {
    if (loading === true) {
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
  const styles = {
    header: {
      textAlign: "left",
      fontWeight: "bold",
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      ...theme.tableHeader,
    },
    tableRow: {
      ...theme.table,
    },

    columnLeft: {
      textAlign: "left",
    },
    columnRight: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      paddingRight: "1rem",
    },
    boldText: {
      fontWeight: "bold",
      borderRadius: 18,
    },
  };

  return (
    <Col
      lg={12}
      sm={12}
      style={{ justifyContent: "center" }}
      className="px-lg-5 px-sm-1 pt-lg-2 pt-sm-1"
    >
      {globalComponents}
      <ListGroup>
        <ListGroupItem style={styles.header}>
          first_name last_name, birthdate, gender, outcome(plc_status)
        </ListGroupItem>
        {patients.map((patient) => (
          <ListGroupItem key={patient.id} style={styles.tableRow}>
            <Row>
              <Col lg={10} style={styles.columnLeft}>
                {patient.first_name} {patient.last_name},{" "}
                {new Date(patient.birthdate).toLocaleDateString("en-GB")},{" "}
                {patient.gender}, 
                {patient.outcome !== null && patient.outcome.plc_status}
              </Col>
              <Col lg={2}>
                <Row style={styles.columnRight}>
                  <Button
                    variant="nord-pink"
                    className="btn-sm"
                    style={styles.boldText}
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
          <Modal.Header closeButton style={theme.inputField}>
            <Modal.Title>Edit patient</Modal.Title>
          </Modal.Header>
          <Modal.Body style={theme.box}>
            <EditPatientForm
              handleCloseEdit={handleCloseEdit}
              patient={currentPatientEdited}
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
      </ListGroup>
    </Col>
  );
}
