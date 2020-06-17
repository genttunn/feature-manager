import React, { Component, useState } from "react";
import requests from "../utils/requests";
import bsCustomFileInput from "bs-custom-file-input";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Form,
} from "react-bootstrap";

export default function UploadCSVForm({ handleClose }) {
  const [albums, setAlbums] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("Upload QIB CSV");
  const [albumName, setAlbumName] = useState("");
  const [family, setFamily] = useState("");
  const [qibName, setQibName] = useState("");
  const [qibDescription, setQibDescription] = useState("");
  let onFileSelected = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
   
  };
  let onUploadClicked = () => {
    let data = new FormData();
    data.append("file_name", fileName);
    data.append(fileName, selectedFile);
    data.append("album_name", albumName);
    data.append("family", family);
    data.append("qib_name", qibName);
    data.append("qib_description", qibDescription);
    console.log(data);
    requests.uploadCSV(data);
    handleClose();
  };
  return (
    <React.Fragment>
      {" "}
      <Form as={Row} className="mx-2">
        <Form.File
          id="file"
          label={fileName}
          custom
          onChange={(event) => onFileSelected(event)}
        />
        <Form.Control
          type="text"
          placeholder="Input album name"
          name="album_name"
          value={albumName}
          onChange={(event) => setAlbumName(event.target.value)}
          className="input-large"
        />
        <Form.Control
          type="text"
          placeholder="Input feature family"
          name="family"
          value={family}
          onChange={(event) => setFamily(event.target.value)}
          className="input-large"
        />
        <Form.Control
          type="text"
          placeholder="Input QIB name"
          name="family"
          value={qibName}
          onChange={(event) => setQibName(event.target.value)}
          className="input-large"
        />
        <Form.Control
          type="text"
          placeholder="Input QIB description"
          name="family"
          value={qibDescription}
          onChange={(event) => setQibDescription(event.target.value)}
          className="input-large"
          onClick={()=> console.log(selectedFile)}
        />
      </Form>
      <Button
        variant="primary"
        className="my-2 mx-2"
        onClick={() => onUploadClicked()}
      >
        Upload
      </Button>
    </React.Fragment>
  );
}
