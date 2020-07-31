import React, { useState, useContext } from "react";
import requests from "../../utils/requests";
import { Button, Form } from "react-bootstrap";
import { LoadingContext } from "../../shared/LoadingContext";
export default function EditAlbumForm({ handleCloseEdit, album, mode }) {
  const { setLoading } = useContext(LoadingContext);
  const [validated, setValidated] = useState(false);

  let submitEdit = async (name, description) => {
    await requests.editAlbum(album.id, name, description);
    setLoading(true);
    handleCloseEdit();
  };
  let submitNewAlbum = async (name, description) => {
    let response = await requests.newAlbum(name, description);
    if (response !== "OK") {
      alert(response)
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
  return (
    <React.Fragment>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Album name</Form.Label>
          <Form.Control required type="text" placeholder={album.name} />
          <Form.Control.Feedback>Input OK!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Album description</Form.Label>
          <Form.Control required type="text" placeholder={album.description} />
          <Form.Control.Feedback>Input OK!</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">{mode === "EDIT" ? "Edit" : "Add album"}</Button>
      </Form>
    </React.Fragment>
  );
}
