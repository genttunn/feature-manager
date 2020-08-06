import React, { useState, useEffect, useContext } from "react";
import { Button, Card, Modal, Col, Container } from "react-bootstrap";
import requests from "../../utils/requests";
import { LoadingContext } from "../../shared/LoadingContext";
import EditModalityRegionForm from "../../components/forms/EditModalityRegionForm";
import globalComponents from "../../styles/globalComponents";
import { DarkmodeContext } from "../../shared/DarkmodeContext";
import { themeDark, themeLight } from "../../styles/globalStyles";

export default function ModalityRegionView() {
  const { loading, setLoading } = useContext(LoadingContext);
  const [modalities, setModalities] = useState([]);
  const [regions, setRegions] = useState([]);
  const [modalMode, setModalMode] = useState("");
  const [currentObjectEdited, setCurrentObjectEdited] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { darkmode } = useContext(DarkmodeContext);
  const theme = darkmode === true ? themeDark : themeLight;
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

  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
      maxWidth: "83vw",
      justifyContent: "space-around",
    },
    body: {
      display: "grid",
      gridGap: "1rem",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      placeItems: "center",
    },
    sectionTitle: { fontWeight: 200, fontSize: 25 },
    section: {
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
      minHeight: "87vh",
      padding: 15,
      borderRadius: 20,
      border: 1,
      borderStyle: "dashed",
      ...theme.section,
    },
    card: {
      ...theme.box,
      placeItems: "center",
      height: "10rem",
      width: "15rem",
      borderRadius: 20,
    },
    boldText: {
      fontWeight: "bold",
      borderRadius: 18,
    },
  };
  return (
    <Container style={styles.container}>
      {globalComponents}
      <Col lg={6} sm={12} style={styles.section}>
        <p style={styles.sectionTitle}>Modalities</p>
        <div style={styles.body}>
          {modalities.map((modality) => (
            <Card style={styles.card} key={modality.id}>
              <Card.Body>
                <Card.Title>{modality.name}</Card.Title>
                <Card.Text>{modality.description}</Card.Text>
                <Button
                  variant="nord-pink"
                  style={styles.boldText}
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
      <Col lg={6} sm={12} style={styles.section}>
        <p style={styles.sectionTitle}>Regions</p>
        <div style={styles.body}>
          {regions.map((region) => (
            <Card style={styles.card} key={region.id}>
              <Card.Body>
                <Card.Title>{region.name}</Card.Title>
                <Card.Text>{region.description}</Card.Text>
                <Button
                  variant="nord-pink"
                  style={styles.boldText}
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
        <Modal.Header closeButton style={theme.inputField}>
          <Modal.Title>
            Edit {modalMode === "MODALITY" ? "modality" : "region"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={theme.box}>
          <EditModalityRegionForm
            handleCloseEdit={handleCloseModal}
            object={currentObjectEdited}
            mode={modalMode}
          />
        </Modal.Body>
        <Modal.Footer style={theme.inputField}>
          <Button
            variant="nord-orange"
            style={styles.boldText}
            onClick={handleCloseModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
