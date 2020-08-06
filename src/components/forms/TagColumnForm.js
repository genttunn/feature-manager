import React, { useState, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import globalComponents from "../../styles/globalComponents";
import { DarkmodeContext } from "../../shared/DarkmodeContext";
import { themeDark, themeLight } from "../../styles/globalStyles";

export default function TagColumnForm({
  handleCloseModal,
  columns,
  outcome,
  metadata,
  editTag,
}) {
  const [metadataColumns, setMetadataColumns] = useState(
    metadata === "" ? [] : metadata.split(",")
  );
  const [validated, setValidated] = useState(false);
  const { darkmode } = useContext(DarkmodeContext);
  const theme = darkmode === true ? themeDark : themeLight;

  let chooseTag = (outcome, metadata) => {
    editTag(outcome, metadata);
    handleCloseModal();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const outcome = event.target.elements.outcome.value;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      let metadata_string = "";
      metadataColumns.forEach((column) => (metadata_string += column + ","));
      chooseTag(outcome, metadata_string.slice(0, -1));
    }
  };
  let handleSelect = (event) => {
    if (metadataColumns.includes(event.target.value)) {
      let filter = metadataColumns.filter(
        (column) => column !== event.target.value
      );
      setMetadataColumns(filter);
    } else {
      metadataColumns.push(event.target.value);
    }
  };
  const styles = {
    boldText: {
      fontWeight: "bold",
      borderRadius: 18,
    },
    scrollbar: { height: "30vh" },
  };

  return (
    <React.Fragment>
      {globalComponents}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="outcome">
          <Form.Label>Outcome column</Form.Label>
          <Form.Control
            as="select"
            size="sm"
            custom
            style={theme.inputField}
            defaultValue={outcome !== null && outcome}
          >
            {columns.map((column) => (
              <option key={column.id}>{column.title}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="metadata">
          <Form.Label>Metadata columns</Form.Label>
          <Form.Control
            as="select"
            size="sm"
            custom
            multiple
            value={metadataColumns}
            style={theme.inputField}
            onChange={(event) => handleSelect(event)}
          >
            {columns.map((column) => (
              <option key={column.id}>{column.title}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button type="submit" variant="nord-jade" style={styles.boldText}>
          Submit tags
        </Button>
      </Form>
    </React.Fragment>
  );
}
