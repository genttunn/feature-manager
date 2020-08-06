import React, { useState, useContext } from "react";
import requests from "../../utils/requests";
import { Button, Form } from "react-bootstrap";
import { LoadingContext } from "../../shared/LoadingContext";
import globalComponents from "../../styles/globalComponents";
import { DarkmodeContext } from "../../shared/DarkmodeContext";
import { themeDark, themeLight } from "../../styles/globalStyles";
export default function EditModalityRegionForm({
  handleCloseEdit,
  object,
  mode,
}) {
  const { setLoading } = useContext(LoadingContext);
  const [validated, setValidated] = useState(false);
  const { darkmode } = useContext(DarkmodeContext);
  const theme = darkmode === true ? themeDark : themeLight;

  let submitEdit = async (name, description) => {
    let response = "request unsuccessful";
    if (mode === "MODALITY") {
      response = await requests.editModality(object.id, name, description);
    } else if (mode === "REGION") {
      response = await requests.editRegion(object.id, name, description);
    }

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
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            maxlength="5"
            placeholder={object.name}
            defaultValue={object.name}
            style={theme.inputField}
          />
          <Form.Control.Feedback>Input OK!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            type="text"
            maxlength="20"
            placeholder={object.description}
            defaultValue={object.description}
            style={theme.inputField}
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
