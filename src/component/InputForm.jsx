import React, { Fragment, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import "./InputForm.css";
import InputComponent from "./InputComponent";

const Data = [];

const InputForm = () => {
  const [addField, setAddField] = useState(Data);

  const formItemHandler = () => {
    const newField = {
      id: new Date(),
      serial_no: addField.length + 1,
      field_name: "addName",
      field_type: "STRING",
      isRequired: true,
      childFields: [],
    };
    setAddField((prev) => [...prev, newField]);
  };

  const changeFieldData = (updatedField) => {
    const updatedFields = [...addField];
    const index = updatedFields.findIndex((field) => field === updatedField);
    updatedFields[index] = updatedField;
    setAddField(updatedFields);
  };

  const deleteField = (removeField) => {
    const updatedFields = addField.filter((each) => each !== removeField);
    setAddField(updatedFields);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log(addField);
  };
  return (
    <section className="card">
      <form onSubmit={formSubmitHandler} className="form-input-wrapper">
        <div className="form-title">
          <h4>Field name and type</h4>
          <div className="add-icon" onClick={formItemHandler}>
            <AddIcon style={{ color: "grey" }} />
          </div>
        </div>

        {addField.map((field) => (
          <InputComponent
            key={field.id}
            addField={field}
            deleteField={deleteField}
            changeField={changeFieldData}
          />
        ))}

        {addField.length > 0 && (
          <div className="btn">
            <button>Submit</button>
          </div>
        )}
      </form>
    </section>
  );
};

export default InputForm;
