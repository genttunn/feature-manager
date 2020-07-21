import React, { Component } from "react";
import requests from "../utils/requests";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Form,
  Tab,
  Nav,
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
      studies: [],
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
    data.append("family", this.state.family);
    requests.uploadCSV(data);
  };
  fetchStudiesByAlbum = async (e) => {
    let object = await requests.getStudyByAlbum(e);
    if (object && object.length > 0) {
      this.setState((prevState) => {
        return { ...this.state, studies: object };
      });
    }
    console.log(object);
  };
  render() {
    return (
      <Tab.Container id="left-tabs" defaultActiveKey="first" style={styles.body}>
        <Row>
          <Col sm={3} style={styles.sidebar}>
            <Nav.Link eventKey="album">Album</Nav.Link>
            <Nav.Link eventKey="patient">Patient</Nav.Link>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="album">Hellooooooooo</Tab.Pane>
              <Tab.Pane eventKey="patient">Hellooooooooo2</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}
const styles = {
  sidebar: {
    height: "100vh",
    background: "#434C5E",
    fontSize: "1rem",
    textAlign: "center"
  },
  content: {
    padding: "2rem",
  },
};
