import React, { useState, useContext } from "react";
import requests from "../../utils/requests";
import { Button, Form } from "react-bootstrap";
import { LoadingContext } from "../../shared/LoadingContext";
import globalComponents from "../../styles/globalComponents";
import { DarkmodeContext } from "../../shared/DarkmodeContext";
import { themeDark, themeLight } from "../../styles/globalStyles";
export default function UploadCSVForm({ handleClose, albums }) {
  const { setLoading } = useContext(LoadingContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("Upload QIB CSV");
  const [validated, setValidated] = useState(false);
  const { darkmode } = useContext(DarkmodeContext);
  const theme = darkmode === true ? themeDark : themeLight;

  let onFileSelected = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };
  let uploadCSV = async (albumName, qibName, qibDescription, csvType) => {
    let data = new FormData();
    data.append("file_name", fileName);
    data.append(fileName, selectedFile);
    data.append("album_name", albumName);
    data.append("qib_name", qibName);
    data.append("qib_description", qibDescription);
    data.append("csv_type", csvType);
    let response = await requests.uploadCSV(data);
    if (response !== "OK") {
      alert(response);
    }
    handleClose();
    setLoading(true);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const albumName = event.target.elements.albumName.value;
    const qibName = event.target.elements.qibName.value;
    const qibDescription = event.target.elements.qibDescription.value;
    const csvType = event.target.elements.csvType.value;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      uploadCSV(albumName, qibName, qibDescription, csvType);
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
        <Form.Group controlId="file">
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
          <Form.Control as="select" size="sm" custom style={theme.inputField}>
            {albums.map((album) => (
              <option key={album.id}>{album.name}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="qibName">
          <Form.Label>QIB name</Form.Label>
          <Form.Control
            required
            type="text"
            style={theme.inputField}
            defaultValue={fileName === "Upload QIB CSV" ? "" : fileName}
          />
          <Form.Control.Feedback>Input OK!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="qibDescription">
          <Form.Label>QIB description</Form.Label>
          <Form.Control required type="text" style={theme.inputField} />
          <Form.Control.Feedback>Input OK!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="csvType">
          <Form.Label>CSV type</Form.Label>
          <Form.Control as="select" size="sm" custom style={theme.inputField}>
            <option>New QIB</option>
            <option>Outcome list</option>
            <option>Custom QIB</option>
          </Form.Control>
        </Form.Group>
        <Button variant="nord-jade" style={styles.boldText} type="submit">
          Submit
        </Button>
      </Form>
    </React.Fragment>
  );
}
