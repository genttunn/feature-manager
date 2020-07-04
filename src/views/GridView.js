import React, { useState, useEffect, useContext } from "react";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
} from "react-bootstrap";
import ReactLoading from "react-loading";
import Scrollbar from "react-scrollbars-custom";
import UploadCSVForm from "../components/forms/UploadCSVForm";
import QIBCard from "../components/QIBCard";
import QIBFilters from "../components/QIBFilters";
import InteractiveQIBTable from "../components/InteractiveQIBTable";
import { LoadingContext } from "../shared/LoadingContext";
import { DarkmodeContext } from "../shared/DarkmodeContext";
import requests from "../utils/requests";
import mockData from "../utils/mockData";
import useWindowDimensions from "../utils/useWindowDimensions";
import { themeDark, themeLight } from "../styles/globalStyles";
import globalComponents from "../styles/globalComponents";
export default function GridView() {
  const { loading, setLoading } = useContext(LoadingContext);
  const { darkmode } = useContext(DarkmodeContext);
  const [globalTheme, setGlobalTheme] = useState(themeLight);
  const [loadingQib, setLoadingQib] = useState(false);
  const { height, width } = useWindowDimensions();
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
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    if (darkmode === true) {
      setGlobalTheme(themeDark);
    } else if (darkmode === false) {
      setGlobalTheme(themeLight);
    }
  }, [darkmode]);

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
  };
  let fetchQIBFeature = async (e) => {
    setLoadingQib(true);
    let object = await requests.getQIBFeatureByQIB(e);
    if (object && object.length > 0) {
      setQibData(object);
      setCurrentQIBLoaded(e);
      setLoadingQib(false);
    }
    // setQibData(mockData);
    // setCurrentQIBLoaded(e);
    // setLoadingQib(false);
  };
  let setStyleCard = (qib_id) => {
    return qib_id === currentQIBLoaded
      ? globalTheme.cardSelected
      : globalTheme.cardNormal;
  };
  return (
    <div>
      {globalComponents}
      <Row className={layout.rowContainer}>
        <Col className={layout.columnLeft} style={styles.box}>
          <p style={{ ...styles.sectionTitle, color: globalTheme.text }}>
            QIBs: {qibs.length}
          </p>
          <Row className={layout.rowFilterButtons} style={styles.basicRow}>
            <QIBFilters
              fetchQIBs={fetchQIBs}
              albums={albums}
              setQibs={setQibs}
            />
          </Row>
          <Scrollbar style={{ height: height * 0.75 }}>
            <ListGroup
              className={layout.listQIBCards}
              lg={12}
              style={styles.cardText}
            >
              {qibs.map((qib) => (
                <ListGroupItem key={qib.id} style={setStyleCard(qib.id)}>
                  <QIBCard qib={qib} fetchQIBFeature={fetchQIBFeature} />
                </ListGroupItem>
              ))}
            </ListGroup>
          </Scrollbar>
        </Col>
        <Col
          lg={layout.columnRightFull}
          sm={layout.columnRightSmall}
          style={styles.box}
        >
          <p style={{ ...styles.sectionTitle, color: globalTheme.text }}>
            QIB Table
          </p>
          <Row className={layout.rowUploadButtons} style={styles.basicRow}>
            <Col>
              <Button
                variant="nord-orange"
                style={styles.boldText}
                onClick={handleShow}
              >
                Upload QIB
              </Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Upload your QIB</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <UploadCSVForm handleClose={handleClose} />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
          <Scrollbar
            style={{
              height: height * 0.75,
            }}
          >
            {loadingQib === true ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <span style={{color: globalTheme.text}}>Loading QIB</span>
                <div className="mx-2">
                  <ReactLoading
                    type={"spokes"}
                    color={globalTheme.text}
                    height={20}
                    width={20}
                  />
                </div>
              </div>
            ) : (
              <InteractiveQIBTable data={qibData} />
            )}
          </Scrollbar>
        </Col>
      </Row>
    </div>
  );
}

const styles = {
  box: {
    // border: 1,
    // borderStyle: "solid",
    // borderColor: "green",
  },
  sectionTitle: { fontWeight: 200, fontSize: 25 },
  basicRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  scrollBox: {
    overflow: "scroll",
    alignContent: "center",
  },
  cardText: {
    textAlign: "left",
  },
  boldText: {
    fontWeight: "bold",
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
/* <Form width="100%">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text
                      id="inputGroupPrepend"
                      onClick={() => generateCSV()}
                      style={{ backgroundColor: "#39a451", color: "white" }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#2f8a43")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#39a451")
                      }
                    >
                      Export CSV
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="Click feature to add"
                    aria-describedby="inputGroupPrepend"
                    name="features"
                    value={featureSet}
                    onChange={(e) => setFeatureSet(e.target.value)}
                    className="input-large"
                  />
                </InputGroup>
              </Form> */
