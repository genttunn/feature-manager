import React, { Component, useState, useEffect } from "react";
import { Table } from "react-bootstrap";

export default function QIBFeatureTable({ data, onFeatureClick }) {
  const [rows, setRows] = useState([]);
  useEffect(() => {

    data && generateRows(data)
  }, [data]);

  let generateRows = (data) => {
    let countRows = data[0].values.length;
    let countColumns = data.length;
    console.log(countRows)
    console.log(countColumns)
    let rows = [];
    let i;
    let u;
    for (i = 0; i < countRows; i++) {
      let row=[];
      for (u = 0; u < countColumns; u++){
          // let cell={};
          // let a = data[u].column_name
          let b = data[u].values[i]
          // cell[a] = b;
          row.push(b)
      }
      rows.push(row);
    }
    console.log(rows);
    setRows(rows);
  };

  return (
    <Table striped bordered hover size="sm" responsive>
      <thead>
        <tr>
          {data && data.map(column=><th onClick={()=>onFeatureClick(column.column_name)}>{column.column_name}</th>)}
        </tr>
      </thead>
      <tbody>
       {rows && rows.map(row=><tr>{row.map(entry=><td>{entry}</td>)}</tr>)}
       
      
      </tbody>
    </Table>
  );
}
