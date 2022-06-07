import { Button, Form, FormGroup, Input, Label, Alert } from "reactstrap";
import "../../styles/styles_1.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/auth";

export default function EditSupplyManager(props) {
  const auth = useAuth();
  const navigate = useNavigate();

  const supplymanagers = props.supplymanagers;

  const initialValues = supplymanagers[props.row];
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

  const sendData = () => {
    const url = `http://localhost:8087/manager/update`; //Edit Supplier
    
    axios.defaults.withCredentials = true;
    axios
      .post(url, data, {withCredentials:true})
      .then((res) => {
        setAlertColor("info");
        setAlertMessage("Successfully added.");
        setShowToTrue();
        navigate(0);
      })
      .catch((err) => {
        setAlertColor("danger");
        setAlertMessage("");
        switch (err.response.request.status) {
          case 400:
            setAlertMessage("Request Failed");
            setShowToTrue();
            break;
          case 401:
            auth.logout();
            auth.setAlert("Session Expired! Login Again");
            navigate("/");
            break;
          case 500:
            setAlertMessage("Server Error!");
            setShowToTrue();
            break;
          case 501:
            setAlertMessage("Server Error!");
            setShowToTrue();
            break;
          case 502:
            setAlertMessage("Server Error!");
            setShowToTrue();
            break;
          default:
            break;
        }
      });
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

    if (!reContact.test(values.contact)) {
      errors.contact = "Invalid Contact Number";
    }

    return errors;
  };

  return (
    <React.Fragment>
      <Alert isOpen={show} color={alertColor} toggle={setShowToFalse}>
        <p>{alertMessage}</p>
      </Alert>
      <div className="Container-fluid">
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
              readOnly
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
