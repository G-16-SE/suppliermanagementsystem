import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import React, { useState,useEffect } from "react";
import "../../styles/styles_1.css";
import axios from "axios";

export default function EditStorage(props) {
  const storage = props.storage;

  const dataID = props.id;
  const initialValues = storage.filter((s) => s.id === parseInt(dataID, 10))[0];
  const [formValues,setformValues] = useState(initialValues)
  const [isSubmit,setIsSubmit] = useState(false);
  const [formErrors, setformErrors] = useState({})
  const [data, setData] = useState(null);

  const sendData = () => {
    const url = `http://localhost:8087/storage/update/${data.id}`;

   axios
      .post(url, data)
      .then((res) => {
        console.log("response", res);
      })
      .catch((err) => {
        console.log("error::::", err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({...formValues, [name]:value});
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    setformErrors(validate(formValues));
    setIsSubmit(true);  
    setData(formValues);
  }

  useEffect(() => {

    if(Object.keys(formErrors).length === 0 && isSubmit){
        sendData()
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {}
 
    return errors;
  }  

  return (
    <div className="Container-fluid shadow-2-strong">
      <div className="row">
        <div className="col-6 offset-1">
          <Form className="form"  onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="typename">Type Name</Label>
              <Input
                type="text"
                name="type"
                id="type"
                readOnly
                value={formValues.type}
              />
            </FormGroup>

            <FormGroup>
              <Label for="unit">Unit</Label>
              <Input
                type="text"
                name="unit"
                id="unit"
                readOnly
                value={formValues.unit}
              />
            </FormGroup>

            <FormGroup>
              <Label for="refilledDate">Last Refilled Date</Label>
              <Input
                type="text"
                name="last_refilled_date"
                id="last_refilled_date"
                readOnly
                value={formValues.last_refilled_date}
              />

            </FormGroup>

            <FormGroup>
              <Label for="unit_price">Unit Price</Label>
              <Input
                type="number"
                step="0.01"
                name="unit_price"
                id="unit_price"
                value={formValues.unit_price}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="stock_amount">Stock Amount </Label>
              <Input
                type="number"
                step="0.01"
                name="stock_amount"
                id="stock_amount"
                value={formValues.stock_amount}
                onChange={handleChange}
              />
            </FormGroup>

            <Button color="primary" type="submit">
              {" "}
              Submit{" "}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}