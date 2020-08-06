import React, { useState, useContext } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import requests from "../utils/requests";
import globalComponents from "../styles/globalComponents";
import { themeDark, themeLight } from "../styles/globalStyles";
import { DarkmodeContext } from "../shared/DarkmodeContext";
import "../App.css";
export default function QIBFilters({ fetchQIBs, albums, setQibs }) {
  const [date, setDate] = useState("");
  const { darkmode } = useContext(DarkmodeContext);
  const theme = darkmode === true ? themeDark : themeLight;
  let fetchQIBByAlbum = async (e) => {
    let array = await requests.getQIBByAlbum(e);
    if (array) {
      setQibs(array);
    }
  };
  let fetchQIBByDate = async () => {
    const dateSince = date + " 12:00:00.0";
    let array = await requests.getQIBByDate(dateSince);
    if (array) {
      setQibs(array);
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
      <Dropdown>
        <Dropdown.Toggle
          variant="nord-green"
          id="dropdown-basic"
          style={styles.boldText}
        >
          By Album
        </Dropdown.Toggle>
        <Dropdown.Menu style={theme.box}>
          <Dropdown.Item href="#" onClick={() => fetchQIBs()} style={theme.box}>
            All
          </Dropdown.Item>
          {albums.map((album) => (
            <Dropdown.Item
              key={album.id}
              href="#"
              onClick={() => fetchQIBByAlbum(album.id)}
              style={theme.box}
            >
              {album.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle
          variant="nord-robin"
          id="dropdown-basic"
          style={styles.boldText}
        >
          By Date
        </Dropdown.Toggle>
        <Dropdown.Menu style={theme.box}>
          <Form className="m-2">
            <Form.Group controlId="dateOfExtraction">
              <Form.Control
                type="date"
                placeholder="Enter date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <Button
                className="mx-1 my-2"
                variant="nord-robin"
                style={styles.boldText}
                onClick={() => fetchQIBByDate()}
              >
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Dropdown.Menu>
      </Dropdown>
    </React.Fragment>
  );
}
