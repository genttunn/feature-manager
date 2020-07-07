import React, { useState, useContext } from "react";
import requests from "../../utils/requests";
import { Button, Form } from "react-bootstrap";
import { LoadingContext } from "../../shared/LoadingContext";
export default function EditQIBForm({ handleCloseEdit, qibID }) {
  const { setLoading } = useContext(LoadingContext);
  const [validated, setValidated] = useState(false);

  let submitEdit = (name, description, outcome_columns) => {
    requests.editQIB(qibID, name, description, outcome_columns);
    handleCloseEdit();
    setLoading(true);
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
  return (
    <React.Fragment>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>QIB name</Form.Label>
          <Form.Control required type="text" />
          <Form.Control.Feedback>Input OK!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>QIB description</Form.Label>
          <Form.Control required type="text" />
          <Form.Control.Feedback>Input OK!</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">Edit</Button>
      </Form>
    </React.Fragment>
  );
}
