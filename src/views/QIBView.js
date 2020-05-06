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
  Form
} from "react-bootstrap";

export default class QIBView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      qibs: [],
      qib_features: null,
      date: "",
      featureSet: ""
    };
  }
  componentDidMount = async () => {
    this.fetchAlbums();
    this.fetchQIBs();
  };
  fetchAlbums = async () => {
    let array = await requests.getAllAlbums();
    if (array && array.length > 0) {
      // console.log("fetch album");
      // console.log(array);
      this.setState(prevState => {
        return { ...this.state, albums: array };
      });
    }
  };
  fetchQIBs = async () => {
    let array = await requests.getAllQIBs();
    if (array && array.length > 0) {
      // console.log("fetch qib");
      // console.log(array);
      this.setState(prevState => {
        return { ...this.state, qibs: array };
      });
    }
  };
  fetchQIBByAlbum = async e => {
    console.log(e);
    let array = await requests.getQIBByAlbum(e);
    if (array && array.length > 0) {
      // console.log("fetch qib");
      // console.log(array);
      this.setState(prevState => {
        return { ...this.state, qibs: array };
      });
    }
  };
  fetchQIBByDate = async () => {
    const dateSince = this.state.date + " 12:00:00.0";
    console.log(dateSince);
    let array = await requests.getQIBByDate(dateSince);
    if (array && array.length > 0) {
      // console.log("fetch qib");
      // console.log(array);
      this.setState(prevState => {
        return { ...this.state, qibs: array };
      });
    }
  };
  fetchQIBFeature = async e => {
    let array = await requests.getQIBFeatureByQIB(e);
    if (array && array.length > 0) {
      this.setState(prevState => {
        return { ...this.state, qib_features: array };
      });
    }
    console.log(array);
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
                  {this.state.albums.map(album => (
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
                        onChange={e => this.setState({ date: e.target.value })}
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
              {this.state.qibs.map(qib => (
                <ListGroupItem key={qib.id}>
                  Id : {qib.id} <br></br> timeStamp: {qib.timeStamp}
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
              Table
            </p>
            <Row className="ml-5 mt-1 mb-3">
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  size="sm"
                >
                  Export to CSV
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Form className="m-2">
                    <Form.Group controlId="dateOfExtraction">
                      <Form.Control
                        type="text"
                        placeholder="Enter feature separated by space"
                        value={this.state.featureSet}
                        onChange={e =>
                          this.setState({ featureSet: e.target.value })
                        }
                      />
                      <Button variant="primary" size="sm">
                        Export
                      </Button>
                    </Form.Group>
                  </Form>
                </Dropdown.Menu>
              </Dropdown>
            </Row>

            <QIBFeatureTable data={this.state.qib_features} />
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
