import React, { useState } from "react";
import { FormControl, Dropdown } from "react-bootstrap";

const CustomToggle = React.forwardRef(({ children, onClick, style}, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={style}
  >
    {children}
    &#9873;
  </a>
));

// // forwardRef again here!
// // Dropdown needs access to the DOM of the Menu to measure it
// const CustomMenu = React.forwardRef(
//   ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
//     const [value, setValue] = useState("");

//     return (
//       <div
//         ref={ref}
//         style={style}
//         className={className}
//         aria-labelledby={labeledBy}
//       >
//         <FormControl
//           autoFocus
//           className="mx-3 my-2 w-auto"
//           placeholder="Type to filter..."
//           onChange={(e) => setValue(e.target.value)}
//           value={value}
//         />
//         <ul className="list-unstyled">
//           {React.Children.toArray(children).filter(
//             (child) =>
//               !value || child.props.children.toLowerCase().startsWith(value)
//           )}
//         </ul>
//       </div>
//     );
//   }
// );

export default function ColumnToggle({ columnName, editTag, outcome }) {
  const [tagColor, setTagColor] = useState("blue");

  let chooseTag = (column, tag) => {
    editTag(column, tag);
  };
  return (
    <React.Fragment>
    <Dropdown>
      <Dropdown.Toggle
        as={CustomToggle}
        style={{ color: columnName === outcome ? "green" : tagColor }}
      ></Dropdown.Toggle>
      <span className="m-1">{columnName}</span>
      <Dropdown.Menu>
        <Dropdown.Item
          eventKey="outcome"
          onSelect={(e) => chooseTag(columnName, e)}
        >
          Outcome
        </Dropdown.Item>
        {/* <Dropdown.Item eventKey="metadata">Metadata</Dropdown.Item>
        <Dropdown.Item eventKey="feature">
          Feature
        </Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>
    </React.Fragment>
  );
}
