import React, { Component } from "react";
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

export default class DBView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      selectedFile: null,
      filename: "Upload QIB CSV",
      albumname: "",
      family: "",
      studies: []
    };
  }
  componentDidMount = async () => {
    let array = await requests.getAllAlbums();
    if (array && array.length > 0) {
      console.log("fetch");
      console.log(array);
      this.setState((prevState) => {
        return { ...this.state, albums: array };
      });
    }
  };
  onChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
      filename: event.target.files[0].name,
    });
  };
  onClickHandler = () => {
    let data = new FormData();
    data.append("file", this.state.selectedFile);
    data.append("album_name", this.state.album_name);
    data.append("family", this.state.family)
    requests.uploadCSV(data)
  };
    fetchStudiesByAlbum = async (e) => {
    let object = await requests.getStudyByAlbum(e);
    if (object && object.length > 0) {
      this.setState((prevState) => {
        return { ...this.state, studies: object};
      });
    }
    console.log(object);
  };
  render() {
    return (
      <Container>
        <Row className="mb-5 mt-5">
          <Col lg={12}>
            <Form as={Row}>
              <Form.File
                id="file"
                label={this.state.filename}
                custom
                onChange={this.onChangeHandler}
              />
              <Form.Control
                type="text"
                placeholder="Input album name"
                name="album_name"
                value={this.state.album_name}
                onChange={(e) => this.setState({ album_name: e.target.value })}
                className="input-large"
              />
              <Form.Control
                type="text"
                placeholder="Input feature family"
                name="family"
                value={this.state.family}
                onChange={(e) => this.setState({ family: e.target.value })}
                className="input-large"
              />
            </Form>
            <Button
              variant="primary"
              size="sm"
              className="m-2"
              onClick={this.onClickHandler}
            >
              Upload
            </Button>
          </Col>
        </Row>
        <Row className="mb-5 mt-5">
          <Col lg={12}>
            <p style={{ fontWeight: 200, fontSize: 30, color: "black" }}>
              Number of albums: {this.state.albums.length}
            </p>

            <ListGroup>
              {this.state.albums.map((album) => (
                <ListGroupItem key={album.id}>
                  Name : {album.name}, description : {album.description}{" "}
                  <Button
                    variant="success"
                    size="sm"
                    style={{ padding: 4, marginLeft: 5 }}
                    onClick={() => this.fetchStudiesByAlbum(album.id)}
                  >
                    Studies
                  </Button>
                  
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        </Row>
           <Row className="mb-5 mt-5">
          <Col lg={12}>
            <p style={{ fontWeight: 200, fontSize: 30, color: "black" }}>
              Studies: {this.state.studies.length}
            </p>

            <ListGroup>
              {this.state.studies.map((study) => (
                <ListGroupItem key={study.id}>
                  Patient : {study.patient.first_name+" "+study.patient.last_name}, timeStamp : {study.time_stamp}
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}
