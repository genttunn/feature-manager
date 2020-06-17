import React, { Component, useState, useEffect, useMemo } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import { Button, Row, Col } from "react-bootstrap";
export default function InteractiveQIBTable({ data, onFeatureClick }) {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [exportMode, setExportMode] = useState(true);
  useEffect(() => {
    data && formatDataForTable(data);
    console.log(columns);
    console.log(rows);
  }, [data]);

  let formatDataForTable = (data) => {
    const firstRow = data[0];
    const metadata = ["patientName", "plc_status", "modality", "ROI"];
    Object.keys(firstRow).forEach((key, index) => {
      if (!metadata.includes(key)) {
        columns.push({
          title: key,
          field: key,
          type: "numeric",
          filtering: false,
        });
      } else if (key === "plc_status") {
        columns.push({
          title: key,
          field: key,
          type: "numeric",
        });
      } else {
        columns.push({ title: key, field: key, filtering: false });
      }
    });
    setRows(data);
  };
  let filterMultipleRows = () => {
    setRows(rows.filter((row) => selectedRows.includes(row)));
  };
  const tableOptions = {
    pageSize: 10,
    selection: true,
    exportButton: true,
    exportAllData: exportMode,
    filtering: true,
    columnsButton:true
  };
  const tableActions = [
    {
      icon: "delete-forever",
      tooltip: "Remove Row",
      onClick: (event, rowData) =>
        setRows(rows.filter((row) => row !== rowData)),
    },
  ];
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#9effc3",
      },
      secondary: {
        main: "#119142",
      },
    },
  });
  const toolBar = {
    Toolbar: (props) => (
      <div>
        <MTableToolbar {...props} />
        <Button
          className="btn btn-success mx-2"
          size="sm"
          onClick={() => filterMultipleRows()}
        >
          Filter selected rows
        </Button>
        <Button
          className="btn btn-info mx-2"
          size="sm"
          onClick={() => setExportMode(!exportMode)}
        >
          CSV Export Mode: {exportMode ? "All" : "Current Page"}
        </Button>
      </div>
    ),
  };
  return (
    <React.Fragment>
      {data !== null ? (
        <MuiThemeProvider theme={theme}>
          <MaterialTable
            title={"Table View"}
            columns={columns}
            data={rows}
            options={tableOptions}
            actions={tableActions}
            components={toolBar}
            onSelectionChange={(evt, selectedRow) => {
              selectedRows.includes(selectedRow)
                ? setSelectedRows(
                    selectedRows.filter((row) => row !== selectedRow)
                  )
                : selectedRows.push(selectedRow);
            }}
            onRowClick={(evt, selectedRow) => {
              console.log(selectedRow);
              console.log(selectedRows);
            }}
          />
        </MuiThemeProvider>
      ) : (
        <span>Click Load to start</span>
      )}
    </React.Fragment>
  );
}

//   columns = [
//     { title: "Name", field: "name" },
//     { title: "Surname", field: "surname" },
//     { title: "Birth Year", field: "birthYear", type: "numeric" },
//     {
//       title: "Birth Place",
//       field: "birthCity",
//       lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
//     },
//   ];
//   let data1 = [
//     { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
//     {
//       name: "Zerya Betül",
//       surname: "Baran",
//       birthYear: 2017,
//       birthCity: 34,
//     },
//   ];
