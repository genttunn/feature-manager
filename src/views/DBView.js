import React from "react";
import { Row, Col, Tab, Nav } from "react-bootstrap";
import Scrollbar from "react-scrollbars-custom";
import AlbumView from "./dbitems/AlbumView";
import PatientView from "./dbitems/PatientView";
import ModalityRegionView from "./dbitems/ModalityRegionView";
import FamilyFeatureView from "./dbitems/FamilyFeatureView";

export default function DBView() {
  const styles = {
    sidebar: {
      height: "93vh",
      background: "#434C5E",
      fontSize: "1rem",
      textAlign: "center",
      borderBottomRightRadius: 30,
    },
    navigator: {
      paddingTop: "1rem",
      textAlign: "left",
    },
    scrollbar: { height: "90vh" },
    content: {
      paddingTop: "1rem",
    },
    link: {
      color: "white",
    },
  };

  return (
    <Tab.Container id="left-tabs" defaultActiveKey="album">
      <Row style={{ margin: 0 }}>
        <Col sm={2} style={styles.sidebar}>
          <Nav variant="pills" className="flex-column" style={styles.navigator}>
            <Nav.Link eventKey="album" style={styles.link}>
              Album
            </Nav.Link>
            <Nav.Link eventKey="patient" style={styles.link}>
              Patient
            </Nav.Link>
            <Nav.Link eventKey="modality_region" style={styles.link}>
              Modality & Region
            </Nav.Link>
            <Nav.Link eventKey="family_feature" style={styles.link}>
              Feature Family & Features
            </Nav.Link>
          </Nav>
        </Col>
        <Col sm={10}>
          <Scrollbar style={styles.scrollbar}>
            <Tab.Content style={styles.content}>
              <Tab.Pane eventKey="album">
                <AlbumView />
              </Tab.Pane>
              <Tab.Pane eventKey="patient">
                <PatientView />
              </Tab.Pane>
              <Tab.Pane eventKey="modality_region">
                <ModalityRegionView />
              </Tab.Pane>
              <Tab.Pane eventKey="family_feature">
                <FamilyFeatureView />
              </Tab.Pane>
            </Tab.Content>
          </Scrollbar>
        </Col>
      </Row>
    </Tab.Container>
  );
}
