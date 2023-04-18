import React, { Fragment, useState } from "react";
import { FormControlLabel, Switch } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import "./InputComponent.css";

const OPTIONS = [
  { name: "STRING", value: "STRING" },
  { name: "NUMBER", value: "NUMBER" },
  { name: "BOOLEAN", value: "BOOLEAN" },
  { name: "OBJECT", value: "OBJECT" },
];

const InputComponent = (props) => {
  const { addField, deleteField, changeField } = props;
  const [fieldName, setFieldName] = useState(addField.field_name);
  const [showIcons, setShowIcons] = useState(false);
  const [fieldDataType, setFieldDataType] = useState(addField.field_type);
  const [required, setRequired] = useState(true);
  const [childFields, setChildFields] = useState(addField.childFields || []);

  const onFieldNameChange = (event) => {
    setFieldName(event.target.value);
    changeField({ ...addField, field_name: event.target.value });
  };

  const dataTypeHandler = (event) => {
    setFieldDataType(event.target.value);
    changeField({ ...addField, field_type: event.target.value });
  };

  const handleToggleChange = (event) => {
    setRequired(event.target.checked);
    changeField({ ...addField, isRequired: event.target.checked });
  };

  const handleDeleteField = () => {
    deleteField(addField);
  };

  const handleShowIcons = () => {
    setShowIcons(true);
  };

  const handleHideIcons = () => {
    setShowIcons(false);
  };

  const handleChildFieldsChange = (childFields) => {
    setChildFields(childFields);
    changeField({ ...addField, childFields: childFields });
  };

  const childFieldHandler = () => {
    const newChildField = {
      id: new Date(),
      hasParent: true,
      field_name: "addName",
      field_type: "STRING",
      isRequired: true,
    };
    handleChildFieldsChange([...childFields, newChildField]);
  };

  const showChildField = () => {
    if (fieldDataType === OPTIONS[3].value) {
      return (
        <>
          {childFields.map((childField, index) => (
            <InputComponent
              key={childField.id}
              addField={childField}
              changeField={(updatedField) => {
                const updatedChildFields = [...childFields];
                updatedChildFields[index] = updatedField;
                handleChildFieldsChange(updatedChildFields);
              }}
              deleteField={() => {
                const updatedChildFields = [...childFields];
                updatedChildFields.splice(index, 1);
                handleChildFieldsChange(updatedChildFields);
              }}
            />
          ))}
        </>
      );
    }
    return null;
  };

  return (
    <Fragment>
      <div
        className={`form-input-data ${addField.hasParent ? "vl ml-20" : ""} hr`}
        onMouseOver={handleShowIcons}
        onMouseOut={handleHideIcons}
      >
        <div className={`field-name-type`}>
          {!addField.hasParent && (
            <span className="serial-no">{addField.serial_no}.</span>
          )}
          <input
            type="text"
            id="name"
            size="5"
            value={fieldName}
            onChange={onFieldNameChange}
          />
          <select
            name="data-type"
            value={fieldDataType}
            id="data-type"
            onChange={dataTypeHandler}
          >
            {OPTIONS.map((el) => (
              <option key={el.name} value={el.value}>
                {el.name}
              </option>
            ))}
          </select>
        </div>

        {showIcons && (
          <div className="hidden-icons">
            <Fragment>
              {" "}
              <FormControlLabel
                value={required}
                control={
                  <Switch
                    checked={required}
                    color="primary"
                    size="small"
                    onChange={handleToggleChange}
                  />
                }
                label="Required"
                labelPlacement="start"
              />
            </Fragment>
            {fieldDataType === "OBJECT" && (
              <AddIcon
                style={{ color: "grey", marginLeft: "10px", cursor: "pointer" }}
                onClick={childFieldHandler}
              />
            )}
            <DeleteIcon
              style={{ color: "grey", marginLeft: "5px", cursor: "pointer" }}
              onClick={handleDeleteField}
            />
          </div>
        )}
      </div>
      {showChildField()}
    </Fragment>
  );
};

export default InputComponent;
