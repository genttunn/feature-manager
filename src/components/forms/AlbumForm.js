import React, { useState, useContext } from "react";
import requests from "../../utils/requests";
import { Button, Form, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { LoadingContext } from "../../shared/LoadingContext";
import globalComponents from "../../styles/globalComponents";
import { DarkmodeContext } from "../../shared/DarkmodeContext";
import { themeDark, themeLight } from "../../styles/globalStyles";
import Scrollbar from "react-scrollbars-custom";
export default function EditAlbumForm({
  handleCloseEdit,
  album,
  mode,
  studies,
}) {
  const { setLoading } = useContext(LoadingContext);
  const [validated, setValidated] = useState(false);
  const { darkmode } = useContext(DarkmodeContext);
  const theme = darkmode === true ? themeDark : themeLight;

  let submitEdit = async (name, description) => {
    await requests.editAlbum(album.id, name, description);
    setLoading(true);
    handleCloseEdit();
  };
  let submitNewAlbum = async (name, description) => {
    let response = await requests.newAlbum(name, description);
    if (response !== "OK") {
      alert(response);
    }
    setLoading(true);
    handleCloseEdit();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = event.target.elements.name.value;
    const description = event.target.elements.description.value;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else if (mode === "EDIT") {
      submitEdit(name, description);
    } else if (mode === "ADD") {
      submitNewAlbum(name, description);
    }
  };
  const styles = {
    boldText: {
      fontWeight: "bold",
      borderRadius: 18,
    },
    tableHeader: {
      ...theme.tableHeader,
    },
    tableRow: {
      ...theme.table,
    },
    scrollbar: { height: "30vh" },
  };
  return (
    <React.Fragment>
      {globalComponents}
      {mode === "STUDIES" ? (
        <span>
          Total: {studies.length} studies
          <Scrollbar style={styles.scrollbar}>
            <ListGroup>
              <ListGroupItem style={styles.tableHeader}>
                <Row>Study name, Patient first_name, Outcome</Row>
              </ListGroupItem>
              {studies.map((study) => (
                <ListGroupItem key={study.id} style={styles.tableRow}>
                  <Row>
                    {study.name}, {study.patient.first_name} ,{" "}
                    {study.patient.outcome.plc_status}
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Scrollbar>
        </span>
      ) : (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Album name</Form.Label>
            <Form.Control
              required
              type="text"
              maxlength="20"
              style={theme.inputField}
              placeholder={mode === "EDIT" ? album.name : '' }
              defaultValue={mode === "EDIT" ? album.name : '' }
            />
            <Form.Control.Feedback>Input OK!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Album description</Form.Label>
            <Form.Control
              required
              type="text"
              maxlength="20"
              style={theme.inputField}
              placeholder={mode === "EDIT" ? album.description : '' }
              defaultValue={mode === "EDIT" ? album.description : '' }
            />
            <Form.Control.Feedback>Input OK!</Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" variant="nord-jade" style={styles.boldText}>
            {mode === "EDIT" ? "Edit" : "Add album"}
          </Button>
        </Form>
      )}
    </React.Fragment>
  );
}
