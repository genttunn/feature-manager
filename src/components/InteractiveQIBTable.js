import React, { useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import { Button } from "react-bootstrap";
export default function InteractiveQIBTable({ data, onFeatureClick }) {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [exportMode, setExportMode] = useState(true);
  useEffect(() => {
    data && formatDataForTable(data);
  }, [data]);

  let formatDataForTable = (rawData) => {
    const firstRow = rawData[0];
    const metadata = [
      "PatientName",
      "plc_status",
      "Modality",
      "ROI",
      "Series_region",
    ];
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
    setRows(rawData);
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
    columnsButton: true,
    showTextRowsSelected: false,
    headerStyle: {
      backgroundColor: "#ECEFF4",
    },
  };
  //   const tableActions = [
  //     {
  //       icon: "delete-forever",
  //       tooltip: "Remove Row",
  //       onClick: (event, rowData) =>
  //         setRows(rows.filter((row) => row !== rowData)),
  //     },
  //   ];
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
          Current Export Mode: {exportMode ? "All" : "Current Page"}
        </Button>
      </div>
    ),
  };
  const editable = {
    onRowAdd: (newData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          setRows([...rows, newData]);
          resolve();
        }, 1000);
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(oldData);
          console.log(newData);
          const dataUpdate = [...rows];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setRows([...dataUpdate]);

          resolve();
        }, 1000);
      }),
    onRowDelete: (oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const dataDelete = [...rows];
          const index = oldData.tableData.id;
          dataDelete.splice(index, 1);
          setRows([...dataDelete]);

          resolve();
        }, 1000);
      }),
  };
  let chooseRows = (evt, selectedRow) => {
    selectedRows.includes(selectedRow)
      ? setSelectedRows(selectedRows.filter((row) => row !== selectedRow))
      : selectedRows.push(selectedRow);
  };
  return (
    <React.Fragment>
      {data !== null ? (
        <MuiThemeProvider theme={theme}>
          <MaterialTable
            style={{ backgroundColor: "#ECEFF4" }}
            title={"Table View"}
            columns={columns}
            data={rows}
            options={tableOptions}
            // actions={tableActions}
            components={toolBar}
            onSelectionChange={(evt, selectedRow) =>
              chooseRows(evt, selectedRow)
            }
            editable={editable}
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
