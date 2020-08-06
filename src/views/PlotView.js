import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Button, Dropdown } from "react-bootstrap";
import requests from "../utils/requests";
import QIBFeatureScatterplot from "../components/plots/QIBFeatureScatterplot";
import StatisticBar from "../components/StatisticBar";
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
  const [secondFeature, setSecondFeature] = useState(null);
  const [plotData, setPlotData] = useState(null);
  const theme = darkmode === true ? themeDark : themeLight;

  useEffect(() => {
    if (loading === true) {
      fetchQIBs();
      fetchStats();
    }
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
  //fetch only features of this qib
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
  const styles = {
    sectionTitle: { fontWeight: 200, fontSize: 25, color: "black" },
    scrollBox: {
      overflow: "scroll",
      alignContent: "center",
    },
    boldText: {
      fontWeight: "bold",
      borderRadius: 20,
    },
    dropdownToggle: {
      fontWeight: "bold",
      borderRadius: 20,
      width: "17vw",
      overflowX: "auto",
    },
    dropdownMenu: { overflowY: "scroll", maxHeight: "25vh" },
    sidebar: {
      ...theme.box,
      borderRadius: 18,
      height: "75vh",
      width: "20vw",
      display: "flex",
      flexDirection: "column",
      placeItems: "center",
      overflowY: "auto",
    },
  };

  return (
    <div className="container-fluid">
      {globalComponents}
      <Row
        className="m-3 mb-0 p-3 ml-4"
        lg={3}
        style={{ ...theme.box, borderRadius: 18 }}
      >
        <Col lg={12}>
          <Row>
            <StatisticBar statistics={statistics} />
          </Row>
        </Col>
      </Row>
      <Row className="mx-3" lg={9}>
        <Col lg={9} sm={12}>
          <QIBFeatureScatterplot data={plotData} />
        </Col>
        <Col className="mx-1 p-3" style={styles.sidebar}>
          <p style={{ ...styles.sectionTitle, color: theme.text }}>
            Choose QIB
          </p>
          <Dropdown>
            <Dropdown.Toggle
              variant="nord-green"
              style={styles.dropdownToggle}
              id="dropdown-basic"
            >
              {currentQIB === null ? "Choose QIB" : currentQIB.name}
            </Dropdown.Toggle>
            <Dropdown.Menu style={styles.dropdownMenu}>
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
          <p style={{ ...styles.sectionTitle, color: theme.text }}>
            Choose first feature
          </p>
          <Dropdown>
            <Dropdown.Toggle
              variant="nord-cotton"
              style={styles.dropdownToggle}
              id="dropdown-basic"
            >
              {firstFeature === null
                ? "Choose first feature"
                : firstFeature.name}
            </Dropdown.Toggle>
            <Dropdown.Menu style={styles.dropdownMenu}>
              {features.map((feature) => (
                <Dropdown.Item
                  key={feature.id}
                  href="#"
                  onClick={() => setFirstFeature(feature)}
                >
                  {feature.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <p style={{ ...styles.sectionTitle, color: theme.text }}>
            Choose second feature
          </p>
          <Dropdown>
            <Dropdown.Toggle
              variant="nord-cotton"
              style={styles.dropdownToggle}
              id="dropdown-basic"
            >
              {secondFeature === null
                ? "Choose second feature"
                : secondFeature.name}
            </Dropdown.Toggle>
            <Dropdown.Menu style={styles.dropdownMenu}>
              {features.map((feature) => (
                <Dropdown.Item
                  key={feature.id}
                  href="#"
                  onClick={() => setSecondFeature(feature)}
                >
                  {feature.name}
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
