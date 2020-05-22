import React, { Component } from "react";
import requests from "../utils/requests";
import QIBFeatureTable from "../components/QIBFeatureTable";

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

export default class QIBView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      qibs: [],
      qib_features: null,
      date: "",
      featureSet: "",
      current_qib: 0,
    };
  }
  componentDidMount = async () => {
    this.fetchAlbums();
    this.fetchQIBs();
  };
  fetchAlbums = async () => {
    let array = await requests.getAllAlbums();
    if (array && array.length > 0) {
      console.log("fetch album");
      console.log(array);
      this.setState((prevState) => {
        return { ...this.state, albums: array };
      });
    }
  };
  fetchQIBs = async () => {
    let array = await requests.getAllQIBs();
    if (array && array.length > 0) {
      // console.log("fetch qib");
      // console.log(array);
      this.setState((prevState) => {
        return { ...this.state, qibs: array };
      });
    }
  };
  fetchQIBByAlbum = async (e) => {
    console.log(e);
    let array = await requests.getQIBByAlbum(e);
    if (array) {
      // console.log("fetch qib");
      // console.log(array);
      this.setState((prevState) => {
        return { ...this.state, qibs: array };
      });
    }
  };
  fetchQIBByDate = async () => {
    const dateSince = this.state.date + " 12:00:00.0";
    console.log(dateSince);
    let array = await requests.getQIBByDate(dateSince);
    if (array) {
      console.log("fetch qib");
      console.log(array);
      this.setState((prevState) => {
        return { ...this.state, qibs: array };
      });
    }
  };
  fetchQIBFeature = async (e) => {
    let object = await requests.getQIBFeatureByQIB(e);
    if (object && object.length > 0) {
      this.setState((prevState) => {
        return { ...this.state, qib_features: object, current_qib: e };
      });
    }
    console.log(object);
  };
  handleFeatureClick = (feature) => {
    if (feature == "modality" || feature == "label") {
      return;
    } else {
      this.setState((prevState) => {
        return {
          ...this.state,
          featureSet: this.state.featureSet + "," + feature,
        };
      });
    }
    console.log(this.state.featureSet);
  };
  generateCSV = async () => {
    if (this.state.featureSet == 0) {
      return;
    }
    let file_dir = await requests.generateCSV(
      this.state.current_qib,
      this.state.featureSet
    );
    if (file_dir) {
      console.log(file_dir)
      alert("CSV file path:  " + file_dir.path);
    }
  };
  render() {
    return (
      <div className="m-5">
        <Row className="mb-5 mt-5" style={{ borderBottomWidth: 4 }}>
          <Col lg={3}>
            <p style={{ fontWeight: 200, fontSize: 25, color: "black" }}>
              QIBs: {this.state.qibs.length}
            </p>
            <Row className="ml-5 mt-1 mb-1">
              <Dropdown className=" mr-5">
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  size="sm"
                >
                  By Album
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#" onClick={this.fetchQIBs}>
                    All
                  </Dropdown.Item>
                  {this.state.albums.map((album) => (
                    <Dropdown.Item
                      key={album.id}
                      href="#"
                      onClick={() => this.fetchQIBByAlbum(album.id)}
                    >
                      {album.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle variant="info" id="dropdown-basic" size="sm">
                  By Date
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Form className="m-2">
                    <Form.Group controlId="dateOfExtraction">
                      <Form.Control
                        type="date"
                        placeholder="Enter date"
                        value={this.state.date}
                        onChange={(e) =>
                          this.setState({ date: e.target.value })
                        }
                      />
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={this.fetchQIBByDate}
                      >
                        Submit
                      </Button>
                    </Form.Group>
                  </Form>
                </Dropdown.Menu>
              </Dropdown>
            </Row>
            <ListGroup className="m-2">
              {this.state.qibs.map((qib) => (
                <ListGroupItem key={qib.id}>
                  Id : {qib.id} <br></br> timeStamp: {qib.time_stamp}
                  <Button
                    color="info"
                    style={{ padding: 4, marginLeft: 5 }}
                    onClick={() => this.fetchQIBFeature(qib.id)}
                  >
                    {" "}
                    Load >
                  </Button>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg={9}>
            <p style={{ fontWeight: 200, fontSize: 25, color: "black" }}>
              QIB Table
            </p>
            <Row className="ml-5 mb-3">
              <Form>
                <Form.Group as={Row} controlId="validationFormikUsername">
                  <InputGroup>
                    <InputGroup.Prepend onClick={this.generateCSV}>
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
                      value={this.state.featureSet}
                      onChange={(e) =>
                        this.setState({ featureSet: e.target.value })
                      }
                      className="input-large"
                    />
                  </InputGroup>
                </Form.Group>
              </Form>
            </Row>
            <QIBFeatureTable
              data={this.state.qib_features}
              onFeatureClick={this.handleFeatureClick}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

// <Col lg={6}>
//   <p style={{ fontWeight: 200, fontSize: 30, color: "black" }}>
//     Number of albums: {this.state.albums.length}
//   </p>
//   <ListGroup>
//     {this.state.albums.map(album => (
//       <ListGroupItem key={album.id}>
//         Name : {album.name}, description : {album.description}{" "}
//         <Button
//           onClick={() => this.fetchQIBs(album.id)}
//           color="info"
//           style={{ padding: 4, marginLeft: 5 }}
//         >
//           Show QIBs{" "}
//         </Button>
//       </ListGroupItem>
//     ))}
//   </ListGroup>
// </Col>
