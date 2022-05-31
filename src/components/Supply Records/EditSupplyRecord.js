import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import '../../styles/styles_1.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditSupplyRecords(props) {
 
  const supplyrecords = props.supplyrecords;
  const initialValues = supplyrecords[props.row];
  const [formValues,setformValues] = useState(initialValues)
  const [isSubmit,setIsSubmit] = useState(false);
  const [formErrors, setformErrors] = useState({})
  const [data, setData] = useState(null);


  const sendData = () => {

    const url = '/supplyRecord/edit/:id' //Edit Supplier

    axios.post(url, data)
    .then((res) => {
      console.log("response", res)
    }).catch(err => {
      console.log("error::::", err)
    })
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

    if (isNaN(values.sup_ID)) {
      errors.sup_ID = "Supplier ID is numeric !";
    }

    return errors;
  } 

  return (
    <div className="Container-fluid">
      <Form className="form" onSubmit={handleSubmit}>
      <FormGroup>
          <Label for="sup_ID">Supplier ID</Label>
          <Input
            type="text"
            name="sup_ID"
            id="sup_ID"
            required={true}
            value={formValues.sup_ID}
            invalid={formErrors.sup_ID === "Supplier ID is numeric !"}
            onChange={handleChange}
          />
          <p class="fst-italic fw-bolder" style={{ color: "#f93154" }}>
            {formErrors.sup_ID}
          </p>
        </FormGroup>

        <FormGroup>
          <Label for="unit_Prize">Unit Price</Label>
          <Input
            type="number"
            step="0.01"
            name="unit_Prize"
            id="unit_Prize"
            value={formValues.unit_Prize}
            required={true}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="amount">amount</Label>
          <Input
            type="number"
            step="0.01"
            name="amount"
            id="amount"
            value={formValues.amount}
            required={true}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="type">Type</Label>
          <Input type="text" name="type" id="exampletype" value={formValues.type} readOnly />
        </FormGroup>

        <FormGroup>
          <Label for="type">Availability</Label>
          <Input type="text" name="availability" id="exampleavailability" value={formValues.availability} required='true'
          onChange={handleChange}/>
        </FormGroup>

        <FormGroup>
          <Label for="date">Received Date</Label>
          <Input
            type="date"
            name="date"
            id="date"
            value={formValues.date}
            required={true}
            onChange={handleChange}
          />
        </FormGroup>

        <Button color="primary" type="submit"> Submit </Button>
      </Form>
    </div>
  );
}
