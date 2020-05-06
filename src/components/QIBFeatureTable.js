import React, { Component, useState, useEffect } from "react";
import { Table } from "react-bootstrap";

export default function QIBFeatureTable({ data }) {
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    makeArray();
    console.log(data);
  }, [data]);
  let makeArray = () => {
    let array = [];
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        array.push(data[key]);
      }
    }
    // setColumns(array);
  };
  return (
    <Table striped bordered hover size="sm" responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>$</th>
          <th>One Column</th>
          <th>One Column</th>
          <th>One Column</th>
          <th>@</th>
          <th>One Column</th>
          <th>One Column</th>
          <th>One Column</th>
          <th>!</th>
          <th>One Column</th>
          <th>One Column</th>
          <th>One Column</th>}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>1</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@famt</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@famt</td>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@famt</td>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@famt</td>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@famt</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@famt</td>
          <td>3</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@famt</td>
          <td>3</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@famt</td>
          <td>3</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@famt</td>
        </tr>
      </tbody>
    </Table>
  );
}
