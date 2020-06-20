import React, { useState,useContext } from "react";
import requests from "../../utils/requests";
import { Row, Button, Form } from "react-bootstrap";
import { LoadingContext } from "../../shared/LoadingContext";
export default function EditQIBForm({ handleCloseEdit, qibID}) {
  const {setLoading } = useContext(LoadingContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  let onEditClicked = () => {
    requests.editQIB(qibID, name, description);
    setLoading(true);
    handleCloseEdit();
  };

  return (
    <React.Fragment>
      <Form as={Row} className="mx-2">
        <Form.Control
          type="text"
          placeholder="Input name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="input-large"
        />
        <Form.Control
          type="text"
          placeholder="Input description"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="input-large"
        />
      </Form>
      <Button
        variant="primary"
        className="my-2 mx-2"
        type="submit"
        onClick={() => onEditClicked()}
      >
        Edit
      </Button>
    </React.Fragment>
  );
}
