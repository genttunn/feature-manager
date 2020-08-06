import React, { useState, useContext } from "react";
import requests from "../../utils/requests";
import { Button, Form } from "react-bootstrap";
import { LoadingContext } from "../../shared/LoadingContext";
import globalComponents from "../../styles/globalComponents";
import { DarkmodeContext } from "../../shared/DarkmodeContext";
import { themeDark, themeLight } from "../../styles/globalStyles";
export default function FamilyFeatureForm({
  handleCloseModal,
  families,
  feature,
  mode,
  family,
}) {
  const { setLoading } = useContext(LoadingContext);
  const [validated, setValidated] = useState(false);
  const { darkmode } = useContext(DarkmodeContext);
  const theme = darkmode === true ? themeDark : themeLight;

  let submitEdit = async (name, family) => {
    await requests.editFeature(feature.id, name, family);
    setLoading(true);
    handleCloseModal();
  };
  let submitNewFamily = async (name) => {
    let response = await requests.newFamily(name);
    if (response !== "OK") {
      alert(response);
    }
    setLoading(true);
    handleCloseModal();
  };
  let editFamily = async (family, name) => {
    let response = await requests.editFamily(family, name);
    if (response !== "OK") {
      alert(response);
    }
    setLoading(true);
    handleCloseModal();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = event.target.elements.name.value;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else if (mode === "FEATURE") {
      const family = event.target.elements.family.value;
      submitEdit(name, family);
    } else if (mode === "FAMILY") {
      submitNewFamily(name);
    } else if (mode === "EDIT") {
      editFamily(family, name);
    }
  };
  const styles = {
    boldText: {
      fontWeight: "bold",
      borderRadius: 18,
    },
  };
  let loadForm = (mode) => {
    switch (mode) {
      case "FEATURE":
        return (
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                maxlength="100"
                placeholder={feature.name}
                defaultValue={feature.name}
                style={theme.inputField}
              />
              <Form.Control.Feedback>Input OK!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="family">
              <Form.Label>Family</Form.Label>
              <Form.Control
                as="select"
                size="sm"
                custom
                style={theme.inputField}
              >
                {families.map((item) => (
                  <option>{item.family}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button type="submit" variant="nord-pink" style={styles.boldText}>
              Edit
            </Button>
          </Form>
        );
      case "FAMILY":
        return (
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                maxlength="20"
                style={theme.inputField}
              />
              <Form.Control.Feedback>Input OK!</Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" variant="nord-jade" style={styles.boldText}>
              Add family
            </Button>
          </Form>
        );
      case "EDIT":
        return (
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                maxlength="20"
                placeholder={family}
                defaultValue={family}
                style={theme.inputField}
              />
              <Form.Control.Feedback>Input OK!</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="nord-pink" style={styles.boldText}>
              Edit
            </Button>
          </Form>
        );
      default:
        return <span>Error</span>;
    }
  };
  return (
    <React.Fragment>
      {globalComponents}
      {loadForm(mode)}
    </React.Fragment>
  );
}
