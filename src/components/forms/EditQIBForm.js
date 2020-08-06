import React, { useState, useContext } from "react";
import requests from "../../utils/requests";
import { Button, Form } from "react-bootstrap";
import { LoadingContext } from "../../shared/LoadingContext";
import globalComponents from "../../styles/globalComponents";
import { DarkmodeContext } from "../../shared/DarkmodeContext";
import { themeDark, themeLight } from "../../styles/globalStyles";
export default function EditQIBForm({ handleCloseEdit, qib }) {
  const { setLoading } = useContext(LoadingContext);
  const [validated, setValidated] = useState(false);
  const { darkmode } = useContext(DarkmodeContext);
  const theme = darkmode === true ? themeDark : themeLight;

  let submitEdit = async (name, description) => {
    await requests.editQIB(qib.id, name, description);
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
    } else {
      submitEdit(name, description);
    }
  };
  const styles = {
    boldText: {
      fontWeight: "bold",
      borderRadius: 18,
    },
  };
  return (
    <React.Fragment>
      {globalComponents}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>QIB name</Form.Label>
          <Form.Control
            required
            type="text"
            maxlength="20"
            style={theme.inputField}
            placeholder={qib.name}
            defaultValue={qib.name}
          />
          <Form.Control.Feedback>Input OK!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>QIB description</Form.Label>
          <Form.Control
            required
            type="text"
            maxlength="20"
            style={theme.inputField}
            placeholder={qib.description}
            defaultValue={qib.description}
          />
          <Form.Control.Feedback>Input OK!</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="nord-jade" style={styles.boldText}>
          Edit
        </Button>
      </Form>
    </React.Fragment>
  );
}
