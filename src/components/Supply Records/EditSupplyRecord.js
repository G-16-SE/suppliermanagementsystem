import { Button, Form, FormGroup, Input, Label, Alert } from "reactstrap";
import "../../styles/styles_1.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/auth";

export default function EditSupplyRecords(props) {
  const auth = useAuth();
  const navigate = useNavigate();

  const supplyrecords = props.supplyrecords;
  const initialValues = supplyrecords[props.row];
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
    const url = `http://localhost:8087/supplyRecord/edit/${data.id}`; //Edit Supplier
    axios.defaults.withCredentials = true;
    axios
      .patch(url, data, { withCredentials: true })
      .then((res) => {
        setAlertColor("info");
        setAlertMessage(res.data.message);
        setShowToTrue();
        navigate(0);
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

    if (isNaN(values.supplier_id)) {
      errors.supplier_id = "Supplier ID is numeric !";
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
            <Label for="supplier_id">Supplier ID</Label>
            <Input
              type="text"
              name="supplier_id"
              id="supplier_id"
              readOnly
              value={formValues.supplier_id}
            />
            <p class="fst-italic fw-bolder" style={{ color: "#f93154" }}>
              {formErrors.supplier_id}
            </p>
          </FormGroup>

          <FormGroup>
            <Label for="unit_Prize">Unit Price</Label>
            <Input
              type="number"
              step="0.01"
              name="unit_prize"
              id="unit_prize"
              value={formValues.unit_prize}
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
            <Input
              type="text"
              name="type"
              id="exampletype"
              value={formValues.type}
              readOnly
            />
          </FormGroup>

          <FormGroup>
            <Label for="date">Received Date</Label>
            <Input
              type="date"
              name="received_date"
              id="received_date"
              value={formValues.received_date}
              required={true}
              onChange={handleChange}
            />
          </FormGroup>

          <Button color="primary" type="submit">
            {" "}
            Submit{" "}
          </Button>
        </Form>
      </div>
    </React.Fragment>
  );
}
