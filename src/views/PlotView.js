import React, { useState, useEffect, useContext } from "react";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  Dropdown,
  Form,
} from "react-bootstrap";
import useWindowDimensions from "../utils/useWindowDimensions";
import requests from "../utils/requests";
import QIBFeatureScatterplot from "../components/plots/QIBFeatureScatterplot";
import globalComponents from "../styles/globalComponents";
import { DarkmodeContext } from "../shared/DarkmodeContext";
import { themeDark, themeLight } from "../styles/globalStyles";
export default function PlotView() {
  const { darkmode } = useContext(DarkmodeContext);
  const [loading, setLoading] = useState(true);
  const [qibs, setQibs] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [features, setFeatures] = useState([]);
  const [currentQIB, setCurrentQIB] = useState(null);
  const [firstFeature, setFirstFeature] = useState(null);
  const [outcome, setOutcome] = useState(null);
  const [secondFeature, setSecondFeature] = useState(null);
  const [plotData, setPlotData] = useState(null);
  const { height, width } = useWindowDimensions();
  const theme = darkmode === true ? themeDark : themeLight;

  useEffect(() => {
    if (loading === true) {
      fetchQIBs();
      fetchStats();
    }
    console.log(qibs);
  }, [loading]);

  let fetchQIBs = async () => {
    let array = await requests.getAllQIBs();
    if (array && array.length > 0) {
      setQibs(array);
    }
  };
  let fetchStats = async () => {
    let stats = await requests.getStatistics();
    if (stats !== null) {
      setStatistics(stats);
      setLoading(false);
    }
  };
  let fetchFeature = async (qib) => {
    setCurrentQIB(qib);
    let array = await requests.getFeaturesOfQIB(qib.id);
    if (array && array.length > 0) {
      setFeatures(array);
    }
  };
  let fetchPlotData = async () => {
    if (
      (currentQIB === null) |
      (firstFeature === null) |
      (secondFeature === null)
    )
      return;
    let data = await requests.getScatterplotDataByQIB(
      currentQIB.id,
      firstFeature.id,
      secondFeature.id
    );
    if (data && data.length > 0) {
      setPlotData(data);
    }
  };
  return (
    <div className="container-fluid">
      {globalComponents}
      <Row
        className="m-3 p-3 ml-4"
        lg={3}
        style={{ ...theme.box, borderRadius: 5 }}
      >
        <Col lg={12}>
          <Row style={styles.box}>
            <Col>
              <Button
                style={{ ...styles.circle, backgroundColor: "#A3BE8C" }}
                className = {darkmode === true ?"btn btn-dark" : "btn btn-light "} 
              >
                <p style={styles.statsTitle}>
                  Series <br />{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {statistics.series}
                  </span>
                </p>
              </Button>
            </Col>
            <Col>
              <Button
                style={{ ...styles.circle, backgroundColor: "#88C0D0" }}
                 className = {darkmode === true ?"btn btn-dark" : "btn btn-light "} 
              >
                <p style={styles.statsTitle}>
                  Studies <br />{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {statistics.studies}
                  </span>
                </p>
              </Button>
            </Col>
            <Col>
              <Button
                style={{ ...styles.circle, backgroundColor: "#BF616A" }}
                 className = {darkmode === true ?"btn btn-dark" : "btn btn-light "} 
              >
                <p style={styles.statsTitle}>
                  Patients <br />{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {statistics.patients}
                  </span>
                </p>
              </Button>
            </Col>
            <Col>
              <Button
                style={{ ...styles.circle, backgroundColor: "#B48EAD" }}
                 className = {darkmode === true ?"btn btn-dark" : "btn btn-light "} 
              >
                <p style={styles.statsTitle}>
                  QIBs <br />{" "}
                  <span style={{ fontWeight: "bold" }}>{statistics.qibs}</span>
                </p>
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="m-3" lg={9} style={styles.box}>
        <Col lg={9} sm={12} style={styles.box}>
          <QIBFeatureScatterplot
            height={height * 0.75}
            width={width}
            data={plotData}
            style={styles.box}
          />
        </Col>
        <Col
          className="mx-1 p-3"
          style={{
            ...theme.box,
            borderRadius: 5,
            height: height * 0.8,
          }}
        >
          <p style={{...styles.sectionTitle, color: theme.text}}>Choose QIB</p>
          <Dropdown>
            <Dropdown.Toggle
              variant="nord-green"
              style={styles.boldText}
              className=" w-100"
              id="dropdown-basic"
            >
              {currentQIB === null ? "Choose QIB" : currentQIB.name}
            </Dropdown.Toggle>
            <Dropdown.Menu
              style={{ overflowY: "scroll", maxHeight: height * 0.25 }}
            >
              {qibs.map((qib) => (
                <Dropdown.Item
                  key={qib.id}
                  href="#"
                  onClick={() => fetchFeature(qib)}
                >
                  {qib.name} : {qib.description}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <p style={{...styles.sectionTitle, color: theme.text}}>Choose first feature</p>
          <Dropdown>
            <Dropdown.Toggle
              variant="nord-cotton"
              style={styles.boldText}
              id="dropdown-basic"
              className="w-100 mw-100"
            >
              {firstFeature === null
                ? "Choose first feature"
                : firstFeature.name}
            </Dropdown.Toggle>
            <Dropdown.Menu
              style={{ overflowY: "scroll", maxHeight: height * 0.25 }}
            >
              {features.map((feature) => (
                <Dropdown.Item
                  key={feature.id}
                  href="#"
                  onClick={() => setFirstFeature(feature)}
                >
                  {feature.name} : {feature.description}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <p style={{...styles.sectionTitle, color: theme.text}}>Choose second feature</p>
          <Dropdown>
            <Dropdown.Toggle
              variant="nord-cotton"
              style={styles.boldText}
              className=" w-100 mw-100"
              id="dropdown-basic"
            >
              {secondFeature === null
                ? "Choose second feature"
                : secondFeature.name}
            </Dropdown.Toggle>
            <Dropdown.Menu
              style={{ overflowY: "scroll", maxHeight: height * 0.25 }}
            >
              {features.map((feature) => (
                <Dropdown.Item
                  key={feature.id}
                  href="#"
                  onClick={() => setSecondFeature(feature)}
                >
                  {feature.name} : {feature.description}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <p style={{...styles.sectionTitle, color: theme.text}}>Choose outcome column</p>
          <Dropdown>
            <Dropdown.Toggle
              variant="nord-orange"
              style={styles.boldText}
              className=" w-100 mw-100"
              id="dropdown-basic"
            >
              {currentQIB === null
                ? "Choose outcome column"
                : currentQIB.outcome_column}
            </Dropdown.Toggle>
            <Dropdown.Menu
              style={{ overflowY: "scroll", maxHeight: height * 0.25 }}
            >
              {features.map((feature) => (
                <Dropdown.Item
                  key={feature.id}
                  href="#"
                  onClick={() => setSecondFeature(feature)}
                >
                  {feature.name} : {feature.description}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Button
            variant="nord-yellow"
            style={styles.boldText}
            className="my-5"
            type="button"
            onClick={() => fetchPlotData()}
          >
            Make Plot
          </Button>
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
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  sectionTitle: { fontWeight: 200, fontSize: 25, color: "black" },
  statsTitle: { fontWeight: 150, fontSize: 20, color: "black" },
  basicRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  scrollBox: {
    overflow: "scroll",
    alignContent: "center",
  },
  boldText: {
    fontWeight: "bold",
    borderRadius: 20,
  },
};
