import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Card,
  Modal,
  Row,
  Col,
  Accordion,
  ListGroup,
  ListGroupItem,
  Badge,
} from "react-bootstrap";
import requests from "../../utils/requests";
import { LoadingContext } from "../../shared/LoadingContext";
import FamilyFeatureForm from "../../components/forms/FamilyFeatureForm";
import globalComponents from "../../styles/globalComponents";
import { DarkmodeContext } from "../../shared/DarkmodeContext";
import { themeDark, themeLight } from "../../styles/globalStyles";
import "../../styles/miscStyleSheet.css";

export default function FamilyFeatureView() {
  const { loading, setLoading } = useContext(LoadingContext);
  const [data, setData] = useState([]);
  const [modalMode, setModalMode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentFeatureEdited, setCurrentFeatureEdited] = useState(0);
  const [currentFamilyEdited, setCurrentFamilyEdited] = useState(0);
  const { darkmode } = useContext(DarkmodeContext);
  const theme = darkmode === true ? themeDark : themeLight;
  useEffect(() => {
    if (loading === true) {
      fetchFamiliesAndFeatures();
    }
  }, [loading]);

  let fetchFamiliesAndFeatures = async () => {
    let data = await requests.getAllFamiliesAndFeatures();
    if (data) {
      setData(data);
    }
    setLoading(false);
  };
  let deleteFamily = async (family) => {
    let response = await requests.deleteFamily(family);
    if (response !== "OK") {
      alert(response);
    }
    setLoading(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModal = (mode, feature = null, family = null) => {
    if (mode === "FEATURE") {
      setCurrentFeatureEdited(feature);
    } else if (mode === "EDIT") {
      setCurrentFamilyEdited(family);
    }
    setModalMode(mode);
    setShowModal(true);
  };
  const modalTitle = (modalMode) => {
    let title = "";
    if (modalMode === "FEATURE") {
      title = "Edit feature";
    } else if (modalMode === "FAMILY") {
      title = "Add new family";
    } else if (modalMode === "EDIT") {
      title = "Change family name";
    }
    return title;
  };

  const styles = {
    columnLeft: {
      textAlign: "left",
    },
    columnRight: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    deleteButton: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      marginRight: 3,
    },
    boldText: {
      fontWeight: "bold",
      borderRadius: 18,
    },
    accordionHeader: {
      ...theme.accordionHeader,
    },
    accordionBackground: {
      ...theme.accordionBackground,
    },
    tableHeader: {
      ...theme.tableHeader,
    },
    tableRow: {
      ...theme.table,
    },
  };
  return (
    <React.Fragment>
      {globalComponents}
      <Button
        variant="nord-jade"
        style={styles.boldText}
        className="mt-2 mb-4"
        onClick={() => handleShowModal("FAMILY", null, null)}
      >
        New Feature Family
      </Button>
      <Accordion>
        {data.map((item) => (
          <Card
            className="rounded-list-item"
            key={item.family}
            style={styles.accordionHeader}
          >
            <Accordion.Toggle as={Card.Header} eventKey={item.family}>
              {item.family} <Badge variant="info">{item.features.length}</Badge>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={item.family}>
              <Card.Body style={styles.accordionBackground}>
                <Row style={styles.deleteButton}>
                  <Button
                    variant="nord-yellow"
                    className="btn-sm mb-3 mr-2"
                    style={styles.boldText}
                    onClick={() => handleShowModal("EDIT", null, item.family)}
                  >
                    Edit '{item.family}'
                  </Button>
                  <Button
                    variant="nord-orange"
                    className="btn-sm mb-3"
                    style={styles.boldText}
                    onClick={() => deleteFamily(item.family)}
                  >
                    Delete '{item.family}'
                  </Button>
                </Row>
                <ListGroup>
                  {item.features.map((feature) => (
                    <ListGroupItem key={feature.id} style={styles.tableRow}>
                      <Row>
                        <Col lg={10} style={styles.columnLeft}>
                          {feature.name}
                        </Col>
                        <Col lg={2} style={styles.columnRight}>
                          <Button
                            variant="nord-pink"
                            style={styles.boldText}
                            className="btn-sm"
                            onClick={() =>
                              handleShowModal("FEATURE", feature, null)
                            }
                          >
                            Edit
                          </Button>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
        <Modal centered show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton style={theme.inputField}>
            <Modal.Title>{modalTitle(modalMode)}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={theme.box}>
            <FamilyFeatureForm
              handleCloseModal={handleCloseModal}
              families={data}
              feature={currentFeatureEdited}
              family={currentFamilyEdited}
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
      </Accordion>
    </React.Fragment>
  );
}
