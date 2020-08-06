import React, { useState, useContext } from "react";
import requests from "../../utils/requests";
import { Button, Form } from "react-bootstrap";
import { LoadingContext } from "../../shared/LoadingContext";
import globalComponents from "../../styles/globalComponents";
import { DarkmodeContext } from "../../shared/DarkmodeContext";
import { themeDark, themeLight } from "../../styles/globalStyles";
export default function EditPatientForm({ handleCloseEdit, patient }) {
  const { setLoading } = useContext(LoadingContext);
  const [validated, setValidated] = useState(false);
  const { darkmode } = useContext(DarkmodeContext);
  const theme = darkmode === true ? themeDark : themeLight;
  let submitEdit = async (
    first_name,
    last_name,
    birthdate,
    gender,
    plc_status
  ) => {
    await requests.editPatient(
      patient.id,
      first_name,
      last_name,
      birthdate,
      gender,
      plc_status
    );
    setLoading(true);
    handleCloseEdit();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const first_name = event.target.elements.first_name.value;
    const last_name = event.target.elements.last_name.value;
    const birthdate = event.target.elements.birthdate.value;
    const gender = event.target.elements.gender.value;
    const plc_status = event.target.elements.plc_status.value;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      submitEdit(first_name, last_name, birthdate, gender, plc_status);
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
        <Form.Group controlId="first_name">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            pattern="[a-zA-Z0-9]+"
            maxlength="50"
            type="text"
            placeholder={patient.first_name}
            defaultValue={patient.first_name}
            style={theme.inputField}
          />
          <Form.Control.Feedback>Input OK!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Alpha-Numerics only (no space)
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="last_name">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            style={theme.inputField}
            value={patient.last_name}
            readOnly
          />
          <Form.Control.Feedback>Input OK!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="birthdate">
          <Form.Label>Birthdate</Form.Label>
          <Form.Control required style={theme.inputField} type="date" />
          <Form.Control.Feedback>Input OK!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            size="sm"
            style={theme.inputField}
            defaultValue={patient.gender}
            custom
          >
            <option>F</option>
            <option>M</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="plc_status">
          <Form.Label>PLC status</Form.Label>
          <Form.Control
            as="select"
            size="sm"
            style={theme.inputField}
            defaultValue={patient.outcome.plc_status}
            custom
          >
            <option>0</option>
            <option>1</option>
          </Form.Control>
        </Form.Group>
        <Button type="submit" variant="nord-jade" style={styles.boldText}>
          Edit
        </Button>
      </Form>
    </React.Fragment>
  );
}
