import React, { useState, useContext } from "react";
import requests from "../../utils/requests";
import { Row, Button, Form } from "react-bootstrap";
import { LoadingContext } from "../../shared/LoadingContext";

export default function UploadCSVForm({ handleClose }) {
  const { setLoading } = useContext(LoadingContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("Upload QIB CSV");
  const [validated, setValidated] = useState(false);

  let onFileSelected = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };
  let uploadCSV = (albumName, featureFamily, qibName, qibDescription) => {
    let data = new FormData();
    data.append("file_name", fileName);
    data.append(fileName, selectedFile);
    data.append("album_name", albumName);
    data.append("family", featureFamily);
    data.append("qib_name", qibName);
    data.append("qib_description", qibDescription);
    console.log(data);
    requests.uploadCSV(data);
    handleClose();
    setLoading(true);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    console.log(event.target.elements);
    const albumName = event.target.elements.albumName.value;
    const featureFamily = event.target.elements.featureFamily.value;
    const qibName = event.target.elements.qibName.value;
    const qibDescription = event.target.elements.qibDescription.value;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      uploadCSV(albumName, featureFamily, qibName, qibDescription);
    }
  };
  return (
    <React.Fragment>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="file">
          <Form.Label>Choose .csv file</Form.Label>
          <Form.File
            id="file"
            label={fileName}
            custom
            accept=".csv"
            onChange={(event) => onFileSelected(event)}
          />
        </Form.Group>
        <Form.Group controlId="albumName">
          <Form.Label>Album name</Form.Label>
          <Form.Control required type="text" />
          <Form.Control.Feedback>Input OK!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="featureFamily">
          <Form.Label>Feature family</Form.Label>
          <Form.Control required type="text" />
          <Form.Control.Feedback>Input OK!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="qibName">
          <Form.Label>QIB name</Form.Label>
          <Form.Control required type="text" />
          <Form.Control.Feedback>Input OK!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="qibDescription">
          <Form.Label>QIB description</Form.Label>
          <Form.Control required type="text" />
          <Form.Control.Feedback>Input OK!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="qibType">
          <Form.Label>QIB type</Form.Label>
          <Row className="mx-2">
            <Form.Check
              inline
              label="New QIB"
              type="radio"
              id="inline-radio-1"
            />
            <Form.Check
              label="Custom Filter"
              type="radio"
              id="inline-radio-2"
            />
          </Row>
          <Form.Control.Feedback>Choose one</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>
    </React.Fragment>
  );
}

// <Form as={Row} className="mx-2">
//   <Form.File
//     id="file"
//     label={fileName}
//     custom
//     onChange={(event) => onFileSelected(event)}
//   />
//   <Form.Control
//     type="text"
//     placeholder="Input album name"
//     required
//     name="album_name"
//     value={albumName}
//     onChange={(event) => setAlbumName(event.target.value)}
//     className="input-large"
//   />
//   <Form.Control
//     type="text"
//     placeholder="Input feature family"
//     required
//     name="family"
//     value={family}
//     onChange={(event) => setFamily(event.target.value)}
//     className="input-large"
//   />
//   <Form.Control
//     type="text"
//     placeholder="Input QIB name"
//     required
//     name="family"
//     value={qibName}
//     onChange={(event) => setQibName(event.target.value)}
//     className="input-large"
//   />
//   <Form.Control
//     type="text"
//     placeholder="Input QIB description"
//     required
//     name="family"
//     value={qibDescription}
//     onChange={(event) => setQibDescription(event.target.value)}
//     className="input-large"
//     onClick={() => console.log(selectedFile)}
//   />
//   <Button
//     variant="primary"
//     type="submit"
//     className="my-2 mx-2"
//     onClick={() => onUploadClicked()}
//   >
//     Upload
//   </Button>
// </Form>

//  let onFileSelected = (event) => {
//     setSelectedFile(event.target.files[0]);
//     console.log(event.target.files)
//     let file_name = ""
//     for (var i = 0; i < event.target.files.length; i++) {
//       console.log(event.target.files[i])
//       file_name += ", "+ event.target.files[i].name;
//     }
//     setFileName(file_name);
//   };
