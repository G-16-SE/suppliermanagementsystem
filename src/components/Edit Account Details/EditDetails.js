import { Button, Form, FormGroup, Input, Label, Alert } from "reactstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../styles/styles_1.css";

export default function EditDetails(props) {
  const initialValues = props.userDetails;
  initialValues.newpass = "";
  initialValues.repass = "";

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
    axios.defaults.withCredentials = true;
    const url = "http://localhost:8087/manager/update"; //EDIT DETAILS

    axios
      .post(url, data, { withCredentials: true })
      .then((res) => {
        setAlertColor("info");
        setAlertMessage("Successfully edited.");
        setShowToTrue();
      })
      .catch((err) => {
        setAlertColor("danger");
        setAlertMessage("");
        switch (err.response.request.status) {
          case 400:
            setAlertMessage(err.response.data.message);
            setShowToTrue();
            break;
          case 401:
            setAlertMessage(err.response.data.message);
            setShowToTrue();
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
    if (
      !(values.newpass === "") &&
      !(values.repass === "") &&
      values.newpass.length < 8
    ) {
      errors.newpass = "Password must be at least 8 characters";
    }
    if (!(values.newpass === values.repass)) {
      errors.repass = "Password did not match !";
    }
    return errors;
  };

  return (
    <React.Fragment>
      <Alert isOpen={show} color={alertColor} toggle={setShowToFalse}>
        <p>{alertMessage}</p>
      </Alert>
      <div className="Container-fluid shadow ">
        <Form className="form" onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={formValues.name}
              onChange={handleChange}
              invalid={formErrors.name === "Name must be at least 3 characters"}
            />
            <p class="fst-italic fw-bolder" style={{ color: "#f93154" }}>
              {formErrors.name}
            </p>
          </FormGroup>

          <FormGroup>
            <Label for="email">Email Address</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={formValues.email}
              onChange={handleChange}
              invalid={formErrors.email === "Invalid Email Address"}
            />
            <p class="fst-italic fw-bolder" style={{ color: "#f93154" }}>
              {formErrors.email}
            </p>
          </FormGroup>

          <FormGroup>
            <Label for="contact">Contact Number</Label>
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
            <Label for="newpass">New Password</Label>
            <Input
              type="password"
              name="password"
              id="newpass"
              // value={formValues.newpass}
              onChange={handleChange}
              invalid={
                formErrors.newpass === "Password must be at least 8 characters"
              }
            />
            <p class="fst-italic fw-bolder" style={{ color: "#f93154" }}>
              {formErrors.newpass}
            </p>
          </FormGroup>
          <FormGroup>
            <Label for="repass">Re-enter new password</Label>
            <Input
              type="password"
              name="repassword"
              id="repass"
              // value={formValues.repass}
              onChange={handleChange}
              invalid={formErrors.repass === "Password did not match !"}
            />
            <p class="fst-italic fw-bolder" style={{ color: "#f93154" }}>
              {formErrors.repass}
            </p>
          </FormGroup>

          <Button color="primary" type="submit">
            {" "}
            Update{" "}
          </Button>
        </Form>
      </div>
    </React.Fragment>
  );
}
