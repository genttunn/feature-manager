import React, { useState, useEffect, useContext } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import globalComponents from "../styles/globalComponents";
import { themeDark, themeLight } from "../styles/globalStyles";
import { DarkmodeContext } from "../shared/DarkmodeContext";
import { Button, Modal } from "react-bootstrap";
import TagColumnForm from "./forms/TagColumnForm";
export default function InteractiveQIBTable({
  data,
  editTag,
  outcome,
  metadata,
}) {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [exportMode, setExportMode] = useState(true);
  const { darkmode } = useContext(DarkmodeContext);
  const theme = darkmode === true ? themeDark : themeLight;
  useEffect(() => {
    data && formatDataForTable(data);
  }, [data]);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModal = () => {
    setShowModal(true);
  };
  let styleHeader = (title) => {
    if (metadata.split(",").includes(title)) {
      return { color: theme.frost3 };
    } else if (title === outcome) {
      return { color: theme.aurora1 };
    } else {
      return null;
    }
  };
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
      columns.push({
        id: index,
        title: key,
        field: key,
        type: metadata.includes(key) && key !== "plc_status" ? null : "numeric",
        filtering: true,
        headerStyle: styleHeader(key),
      });
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
    headerStyle: theme.table,
    exportFileName: "outcome_" + outcome + "_metadata_" + metadata,
  };

  const muiTheme = createMuiTheme({
    palette: {
      type: darkmode === true ? "dark" : "light",
      primary: {
        main: theme.aurora2,
      },
      secondary: {
        main: theme.aurora2,
      },
    },
  });
  const styles = {
    boldText: {
      fontWeight: "bold",
      borderRadius: 20,
    },
    blankDiv: {
      display: "flex",
      height: "75vh",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  };
  const components = {
    Toolbar: (props) => (
      <div>
        <MTableToolbar {...props} />
        <p>{"Outcome: " + outcome + " | Metadata: " + metadata}</p>
        <Button
          variant="nord-orange"
          style={styles.boldText}
          className="btn mx-2"
          size="sm"
          onClick={() => filterMultipleRows()}
        >
          Filter selected rows
        </Button>
        <Button
          variant="nord-yellow"
          style={styles.boldText}
          className="btn mx-2"
          size="sm"
          onClick={() => handleShowModal()}
        >
          Tag columns
        </Button>
        <Button
          variant="nord-robin"
          style={styles.boldText}
          className="btn mx-2"
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
      {globalComponents}
      {data !== null ? (
        <MuiThemeProvider theme={muiTheme}>
          <MaterialTable
            style={theme.table}
            title={"Table View"}
            columns={columns}
            data={rows}
            options={tableOptions}
            components={components}
            onSelectionChange={(evt, selectedRow) =>
              chooseRows(evt, selectedRow)
            }
            editable={editable}
          />
        </MuiThemeProvider>
      ) : (
        <div style={styles.blankDiv}>
          <span style={{ color: theme.text }}>Click Load to start</span>
        </div>
      )}
      <Modal centered show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton style={theme.inputField}>
          <Modal.Title>Tag columns</Modal.Title>
        </Modal.Header>
        <Modal.Body style={theme.box}>
          <TagColumnForm
            handleCloseModal={handleCloseModal}
            columns={columns}
            outcome={outcome}
            metadata={metadata}
            editTag={editTag}
          />
        </Modal.Body>
        <Modal.Footer style={theme.inputField}>
          <Button
            variant="nord-orange"
            style={styles.boldText}
            onClick={handleCloseModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
