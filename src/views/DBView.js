import React, { Component } from "react";
import requests from "../utils/requests";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Form
} from "react-bootstrap";

export default class DBView extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: [] };
  }
  componentDidMount = async () => {
    let array = await requests.getAllAlbums();
    if (array && array.length > 0) {
      console.log("fetch");
      console.log(array);
      this.setState(prevState => {
        return { ...this.state, albums: array };
      });
    }
  };

  render() {
    return (
      <Container>
        <Row className="mb-5 mt-5">
          <Col lg={12}>
            <p style={{ fontWeight: 200, fontSize: 30, color: "black" }}>
              Number of albums: {this.state.albums.length}
            </p>
            <Form>
              <Form.File id="custom-file" label="Upload QIB CSV" custom />
            </Form>
            <ListGroup>
              {this.state.albums.map(album => (
                <ListGroupItem key={album.id}>
                  Name : {album.name}, description : {album.description}{" "}
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}
