import React, { Component, useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
} from "react-bootstrap";

import { LoadingContext } from "../shared/LoadingContext";
import requests from "../utils/requests";
export default function GridView() {
  const { loading, setLoading } = useContext(LoadingContext);
  const [albums, setAlbums] = useState([]);
  const [qibs, setQibs] = useState([]);
  const [date, setDate] = useState("");
  useEffect(() => {
    if (loading === true) {
      console.log("hey");
      fetchAlbums();
      fetchQIBs();
      setLoading(false);
    }
  }, [loading]);

  let fetchAlbums = async () => {
    let array = await requests.getAllAlbums();
    if (array && array.length > 0) {
      console.log("fetch album");
      console.log(array);
      setAlbums(array);
    }
  };
  let fetchQIBs = async () => {
    let array = await requests.getAllQIBs();
    if (array && array.length > 0) {
      console.log("fetch qibs");
      setQibs(array);
    }
  };
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
    <div>
      <Row className="m-3">
        <Col className="mx-1" style={styles.box}>
          <p style={{ fontWeight: 200, fontSize: 25, color: "black" }}>
            QIBs: {qibs.length}
          </p>
          <Row
            className="mx-1 px-1"
            style={{
              ...styles.box,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
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
              <Dropdown.Toggle variant="info" id="dropdown-basic">
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
          </Row>
          <ListGroup className="mx-1" lg={12} style={{ textAlign: "left" }}>
            {qibs.map((qib) => (
              <ListGroupItem key={qib.id}>
                <Row>
                  <Col lg={8}>
                    <span>ID : {qib.id}</span>
                    <br></br>
                    <span>Name : {qib.name}</span>
                    <br></br>
                    <span>Description : {qib.description}</span>
                    <br></br>
                    <span>Date: {qib.time_stamp}</span>
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Row className="my-1 mr-1">
                      <Button
                        className="btn btn-danger btn-block"
                        style={{ width: 70 }}
                      >
                        Edit
                      </Button>
                    </Row>
                    <Row className="my-1 mr-1">
                      <Button
                        className="btn btn-info btn-block"
                        style={{ width: 70 }}
                        //   onClick={() => this.fetchQIBFeature(qib.id)}
                      >
                        Load
                      </Button>
                    </Row>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        <Col lg={9} sm={12} className="mx-1" style={styles.box}>
          <p style={{ fontWeight: 200, fontSize: 25, color: "black" }}>
            QIB Table
          </p>
          <Row
            className="mx-1 px-1"
            style={{
              ...styles.box,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Col >
              <Form width="100%">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text
                      id="inputGroupPrepend"
                      style={{ backgroundColor: "#39a451", color: "white" }}
                    >
                      Export CSV
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="Click feature to add"
                    aria-describedby="inputGroupPrepend"
                    name="features"
                    //   value={this.state.featureSet}
                    //   onChange={(e) =>
                    //     this.setState({ featureSet: e.target.value })
                    //   }
                    className="input-large"
                  />
                </InputGroup>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

const styles = {
  box: {
    border: 1,
    borderStyle: "solid",
    borderColor: "green",
  },
};
