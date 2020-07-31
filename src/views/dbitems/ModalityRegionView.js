import React, { useState, useEffect, useContext } from "react";
import { Button, Card, Modal, Row, Col, Container } from "react-bootstrap";
import requests from "../../utils/requests";
import { LoadingContext } from "../../shared/LoadingContext";
import EditModalityRegionForm from "../../components/forms/EditModalityRegionForm";

const card = (
  <Card
    style={{
      alignSelf: "center",
      backgroundColor: "lightpink",
      height: "10rem",
      width: "14rem",
      borderRadius: 20,
    }}
  >
    <Card.Body>
      <Card.Title>Hoy</Card.Title>
      <Card.Text>Yahoo</Card.Text>
      <Button variant="primary" className="m-1">
        Edit
      </Button>
    </Card.Body>
  </Card>
);

export default function ModalityRegionView() {
  const { loading, setLoading } = useContext(LoadingContext);
  const [modalities, setModalities] = useState([]);
  const [regions, setRegions] = useState([]);
  const [modalMode, setModalMode] = useState("");
  const [currentObjectEdited, setCurrentObjectEdited] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (loading === true) {
      fetchModalitiesAndRegions();
    }
  }, [loading]);

  let fetchModalitiesAndRegions = async () => {
    let modalities = await requests.getAllModalities();
    let regions = await requests.getAllRegions();
    if (modalities && regions) {
      setModalities(modalities);
      setRegions(regions);
    }
    setLoading(false);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModal = (mode, currentObject) => {
    setModalMode(mode);
    setCurrentObjectEdited(currentObject);
    setShowModal(true);
  };
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "row",
        maxWidth: "83vw",
        justifyContent: "space-around",
      }}
    >
      <Col
        lg={6}
        sm={12}
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ECEFF4",
          borderRadius: 20,
          marginRight: 4,
          minHeight: "87vh",
          padding: 15,
        }}
      >
        <p style={{ ...styles.sectionTitle }}>Modalities</p>
        <div style={styles.body}>
          {modalities.map((modality) => (
            <Card style={styles.card} key={modality.id}>
              <Card.Body>
                <Card.Title>{modality.name}</Card.Title>
                <Card.Text>{modality.description}</Card.Text>
                <Button
                  variant="primary"
                  className="m-1"
                  onClick={() => handleShowModal("MODALITY", modality)}
                >
                  Edit
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Col>
      <Col
        lg={6}
        sm={12}
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ECEFF4",
          borderRadius: 20,
          marginLeft: 4,
          minHeight: "87vh",
          padding: 15,
        }}
      >
        <p style={styles.sectionTitle}>Regions</p>
        <div style={styles.body}>
          {regions.map((region) => (
            <Card style={styles.card} key={region.id}>
              <Card.Body>
                <Card.Title>{region.name}</Card.Title>
                <Card.Text>{region.description}</Card.Text>
                <Button
                  variant="primary"
                  className="m-1"
                  onClick={() => handleShowModal("REGION", region)}
                >
                  Edit
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Col>
      <Modal centered show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit {modalMode === "MODALITY" ? "modality" : "region"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditModalityRegionForm
            handleCloseEdit={handleCloseModal}
            object = {currentObjectEdited}
            mode={modalMode}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

const styles = {
  body: {
    display: "grid",
    gridGap: "1rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    placeItems: "center",
  },
  sectionTitle: { fontWeight: 200, fontSize: 25 },
  card: {
    placeItems: "center",
    backgroundColor: "lightpink",
    height: "10rem",
    width: "15rem",
    borderRadius: 20,
  },
};

//  <ListGroup>
//       <ListGroupItem style={styles.header}>
//         first_name last_name, birthdate, gender, outcome(plc_status)
//       </ListGroupItem>
//       {patients.map((patient) => (
//         <ListGroupItem key={patient.id}>
//           <Row>
//             <Col lg={10} style={styles.columnLeft}>
//               {patient.first_name} {patient.last_name},{" "}
//               {new Date(patient.birthdate).toLocaleDateString("en-GB")},{" "}
//               {patient.gender}, {patient.outcome.plc_status}
//             </Col>
//             <Col lg={2}>
//               <Row style={styles.columnRight}>
//                 <Button
//                   className="btn-sm"
//                   style={{ width: 70 }}
//                   onClick={() => handleShowEdit(patient)}
//                 >
//                   Edit
//                 </Button>
//               </Row>
//             </Col>
//           </Row>{" "}
//         </ListGroupItem>
//       ))}
//       <Modal centered show={showEdit} onHide={handleCloseEdit}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit patient</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <EditPatientForm
//             handleCloseEdit={handleCloseEdit}
//             patient={currentPatientEdited}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseEdit}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </ListGroup>
