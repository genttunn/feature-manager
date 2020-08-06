import React from "react";
import { Button, Col } from "react-bootstrap";
import globalComponents from "../styles/globalComponents";
export default function QIBFilters({ statistics }) {
  const styles = {
    circle: {
      width: 100,
      height: 100,
      borderRadius: 50,
      margin: 5,
    },
    statsTitle: { fontWeight: 150, fontSize: 20, color: "black" },
    statsNumber: { fontWeight: "bold" },
  };

  return (
    <React.Fragment>
      {globalComponents}
      <Col>
        <Button variant="nord-pink" style={styles.circle}>
          <p style={styles.statsTitle}>
            Series <br />{" "}
            <span style={styles.statsNumber}>{statistics.series}</span>
          </p>
        </Button>
      </Col>
      <Col>
        <Button variant="nord-yellow" style={styles.circle}>
          <p style={styles.statsTitle}>
            Studies <br />{" "}
            <span style={styles.statsNumber}>{statistics.studies}</span>
          </p>
        </Button>
      </Col>
      <Col>
        <Button variant="nord-red" style={styles.circle}>
          <p style={styles.statsTitle}>
            Patients <br />{" "}
            <span style={styles.statsNumber}>{statistics.patients}</span>
          </p>
        </Button>
      </Col>
      <Col>
        <Button variant="nord-jade" style={styles.circle}>
          <p style={styles.statsTitle}>
            QIBs <br />
            <span style={styles.statsNumber}>{statistics.qibs}</span>
          </p>
        </Button>
      </Col>
    </React.Fragment>
  );
}
