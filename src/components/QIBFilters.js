import React, { useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import requests from "../utils/requests";
import globalComponents from "../styles/globalComponents";
import "../App.css";
export default function QIBFilters({ fetchQIBs, albums, setQibs }) {
  const [date, setDate] = useState("");
  let fetchQIBByAlbum = async (e) => {
    let array = await requests.getQIBByAlbum(e);
    if (array) {
      setQibs(array);
    }
  };
  let fetchQIBByDate = async () => {
    const dateSince = date + " 12:00:00.0";
    console.log(dateSince);
    let array = await requests.getQIBByDate(dateSince);
    if (array) {
      setQibs(array);
    }
  };
  return (
    <React.Fragment>
      {globalComponents}
      <Dropdown>
        <Dropdown.Toggle variant="nord-green" id="dropdown-basic" style={styles.boldText}>
          By Album
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#" onClick={() => fetchQIBs()}>
            All
          </Dropdown.Item>
          {albums.map((album) => (
            <Dropdown.Item
              key={album.id}
              href="#"
              onClick={() => fetchQIBByAlbum(album.id)}
            >
              {album.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant="nord-robin" id="dropdown-basic"  style={styles.boldText}>
          By Date
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Form className="m-2">
            <Form.Group controlId="dateOfExtraction">
              <Form.Control
                type="date"
                placeholder="Enter date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <Button variant="primary" onClick={() => fetchQIBByDate()}>
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Dropdown.Menu>
      </Dropdown>
    </React.Fragment>
  );
}

const styles = {
  boldText:{
    fontWeight:'bold'
  }
}