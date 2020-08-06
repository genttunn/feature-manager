import React, { useState, useEffect, useContext } from "react";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";
import Scrollbar from "react-scrollbars-custom";
import UploadCSVForm from "../components/forms/UploadCSVForm";
import QIBCard from "../components/QIBCard";
import QIBFilters from "../components/QIBFilters";
import InteractiveQIBTable from "../components/InteractiveQIBTable";
import { LoadingContext } from "../shared/LoadingContext";
import { DarkmodeContext } from "../shared/DarkmodeContext";
import requests from "../utils/requests";
import { themeDark, themeLight } from "../styles/globalStyles";
import globalComponents from "../styles/globalComponents";

export default function GridView() {
  const { loading, setLoading } = useContext(LoadingContext);
  const { darkmode } = useContext(DarkmodeContext);
  const [loadingQib, setLoadingQib] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [qibs, setQibs] = useState([]);
  const [qibData, setQibData] = useState(null);
  const [currentQIBLoaded, setCurrentQIBLoaded] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (loading === true) {
      fetchAlbums();
      fetchQIBs();
    }
  }, [loading]);

  const theme = darkmode === true ? themeDark : themeLight;

  let fetchAlbums = async () => {
    let array = await requests.getAllAlbums();
    if (array && array.length > 0) {
      setAlbums(array);
    }
  };

  let fetchQIBs = async () => {
    let array = await requests.getAllQIBs();
    if (array && array.length > 0) {
      setQibs(array);
    }
    setLoading(false);
  };
  let fetchQIBFeature = async (qib) => {
    setLoadingQib(true);
    let object = await requests.getQIBFeatureByQIB(qib.id);
    if (object && object.length > 0) {
      setQibData(object);
      setCurrentQIBLoaded(qib);
      setLoadingQib(false);
    }
  };
  let deleteQIB = async (qib) => {
    if (qib.id === currentQIBLoaded.id) {
      setQibData(null);
    }
    let object = await requests.deleteQIB(qib.id);
    if (object) {
      setLoading(true);
    }
  };
  let saveTags = (updatedQIB) => {
    setLoading(true);
    fetchQIBFeature(updatedQIB);
  };
  let editTag = async (outcome, metadata) => {
    let updatedQIB = await requests.editTag(
      currentQIBLoaded.id,
      outcome,
      metadata
    );
    saveTags(updatedQIB);
  };

  let setStyleCard = (qib_id) => {
    return qib_id === currentQIBLoaded.id
      ? theme.cardSelected
      : theme.cardNormal;
  };

  const styles = {
    sectionTitle: { fontWeight: 200, fontSize: 25 },
    basicRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    scrollBar: { height: "75vh" },
    cardText: {
      textAlign: "left",
    },
    boldText: {
      fontWeight: "bold",
      borderRadius: 18,
    },
    qibTable: {
      display: "flex",
      height: "75vh",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  const layout = {
    rowContainer: "m-3",
    columnLeft: "mx-1",
    rowFilterButtons: "mx-1 px-1 my-3",
    listQIBCards: "mx-1",
    columnRightFull: 9,
    columnRightSmall: 12,
    rowUploadButtons: "mx-1 px-1 my-3",
  };

  return (
    <div className="container-fluid">
      {globalComponents}
      <Row className={layout.rowContainer}>
        <Col className={layout.columnLeft}>
          <p style={{ ...styles.sectionTitle, color: theme.text }}>
            QIBs: {qibs.length}
          </p>
          <Row className={layout.rowFilterButtons} style={styles.basicRow}>
            <QIBFilters
              fetchQIBs={fetchQIBs}
              albums={albums}
              setQibs={setQibs}
            />
          </Row>
          <Scrollbar style={styles.scrollBar}>
            <ListGroup
              className={layout.listQIBCards}
              lg={12}
              style={styles.cardText}
            >
              {qibs.map((qib) => (
                <ListGroupItem key={qib.id} style={setStyleCard(qib.id)}>
                  <QIBCard
                    qib={qib}
                    fetchQIBFeature={fetchQIBFeature}
                    deleteQIB={deleteQIB}
                  />
                </ListGroupItem>
              ))}
            </ListGroup>
          </Scrollbar>
        </Col>
        <Col lg={layout.columnRightFull} sm={layout.columnRightSmall}>
          <p style={{ ...styles.sectionTitle, color: theme.text }}>QIB Table</p>
          <Row className={layout.rowUploadButtons} style={styles.basicRow}>
            <Col>
              <Button
                variant="nord-jade"
                style={styles.boldText}
                onClick={handleShow}
              >
                Upload QIB
              </Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton style={theme.inputField}>
                  <Modal.Title>Upload your QIB</Modal.Title>
                </Modal.Header>
                <Modal.Body style={theme.box}>
                  <UploadCSVForm handleClose={handleClose} albums={albums} />
                </Modal.Body>
                <Modal.Footer style={theme.inputField}>
                  <Button
                    variant="nord-orange"
                    style={styles.boldText}
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
          <Scrollbar style={styles.scrollBar}>
            {loadingQib === true ? (
              <div style={styles.qibTable}>
                <span style={{ color: theme.text }}>Loading QIB</span>
                <div className="mx-2 my-2">
                  <Spinner
                    animation="border"
                    style={{ color: theme.text, width: 20, height: 20 }}
                  />
                </div>
              </div>
            ) : (
              <InteractiveQIBTable
                data={qibData}
                editTag={editTag}
                outcome={currentQIBLoaded.outcome_column}
                metadata={currentQIBLoaded.metadata_columns}
              />
            )}
          </Scrollbar>
        </Col>
      </Row>
    </div>
  );
}
