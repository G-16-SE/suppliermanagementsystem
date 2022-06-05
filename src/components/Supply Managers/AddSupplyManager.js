import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Label, Alert } from "reactstrap";
import "../../styles/styles_2.css";
import axios from "axios";

export default function AddSupplyManager() {
  const initialValues = { name: "", email: "", contact: "", join_date: null };
  const [formValues, setformValues] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setformErrors] = useState({});
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const setShowToTrue = () => {
    setShow(true);
  };

  const setShowToFalse = () => {
    setShow(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setformErrors(validate(formValues));
    setIsSubmit(true);
    setData(formValues);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      sendData();
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const reContact =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    const reEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (values.name.length < 3) {
      errors.name = "Name must be at least 3 characters";
    }
    if (!reEmail.test(values.email)) {
      errors.email = "Invalid Email Address";
    }

    if(!reContact.test(values.contact)){
      errors.contact = 'Invalid Contact Number'
    }

    return errors;
  };

  const sendData = () => {
    const url = "http://localhost:8087/user/signup";
    console.log(data)
    axios
      .post(url, data)
      .then((res) => {
        console.log(res);
        setAlertColor("info");
        setAlertMessage(res.data.message);
        setShowToTrue();
      })
      .catch((err) => {
        console.log(err);
        setAlertColor("danger");
        setAlertMessage("Error!");
        setShowToTrue();
      });
  };

  return (
    <React.Fragment>
      <Alert isOpen={show} color={alertColor} toggle={setShowToFalse}>
        <p>{alertMessage}</p>
      </Alert>
      <div className="Container-fluid shadow-2-strong">
        <Form className="form" onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={formValues.name}
              required={true}
              onChange={handleChange}
              invalid={formErrors.name === "Name must be at least 3 characters"}
            />
            <p class="fst-italic fw-bolder" style={{ color: "#f93154" }}>
              {formErrors.name}
            </p>
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Email Address</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={formValues.email}
              required={true}
              onChange={handleChange}
              invalid={formErrors.email === "Invalid Email Address"}
            />
            <p class="fst-italic fw-bolder" style={{ color: "#f93154" }}>
              {formErrors.email}
            </p>
          </FormGroup>

          <FormGroup>
            <Label for="ContactNo">Contact Number</Label>
            <Input
              type="text"
              name="contact"
              id="contact"
              value={formValues.contact}
              required={true}
              onChange={handleChange}
              invalid={formErrors.contact === "Invalid Contact Number"}
            />
            <p class="fst-italic fw-bolder" style={{ color: "#f93154" }}>
              {formErrors.contact}
            </p>
          </FormGroup>

          <FormGroup>
            <Label for="date">Joined Date</Label>
            <Input
              type="date"
              name="join_date"
              id="join_date"
              value={formValues.join_date}
              required={true}
              onChange={handleChange}
            />
          </FormGroup>

          <Button type="submit" color="primary">
            Submit
          </Button>
        </Form>
      </div>
    </React.Fragment>
  );
}
