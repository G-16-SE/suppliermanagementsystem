import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  Alert,
} from "reactstrap";
import EditDetails from "./EditDetails";
import axios from "axios";
import "../../styles/styles_1.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/auth";

export default function EditAccountDetails() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [show, setShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const setShowToTrue = () => {
    setShow(true);
  };

  const setShowToFalse = () => {
    setShow(false);
  };

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:8087/manager/profile", { withCredentials: true }) //Edit Page
      .then((getUserDetails) => {
        setUserDetails(getUserDetails.data.data[0]);
        setShowToFalse();
      })
      .catch((err) => {
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
  }, [userDetails]);

  return (
    <React.Fragment>
      <div className="Container-fluid shadow ">
        <h2>Account Details</h2>
        <br></br>
        <Alert isOpen={show} color="danger" toggle={setShowToFalse}>
          <p>{alertMessage}</p>
        </Alert>
        <div className="row">
          <div className="col-sm-12 col-md-auto mb-2 align-content-center">
            <Button
              outline
              color="dark"
              className="shadow-sm"
              onClick={setModalIsOpenToTrue}
            >
              Account Details
            </Button>
          </div>
        </div>
        <br></br>
        <Table responsive>
          <br></br>
          <thead></thead>
          <tbody>
            <br></br>
            <tr>
              <td colSpan={5}>
                <b>Name</b>
              </td>
              <td>{userDetails.name}</td>
            </tr>
            <br></br>
            <tr>
              <td colSpan={5}>
                <b>Email Address</b>
              </td>
              <td>{userDetails.email}</td>
            </tr>
            <br></br>
            <tr>
              <td colSpan={5}>
                <b>Contact Number</b>
              </td>
              <td>{userDetails.contact}</td>
            </tr>
            <br></br>
            <tr>
              <td colSpan={5}>
                <b>Joined Date</b>
              </td>

              <td>
                {userDetails.join_date
                  ? userDetails.join_date.split("T")[0]
                  : ""}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <Modal isOpen={modalIsOpen}>
        <ModalHeader
          close={<Button close onClick={setModalIsOpenToFalse}></Button>}
        >
          <h3>Edit Account Details</h3>{" "}
        </ModalHeader>
        <ModalBody>
          <EditDetails userDetails={userDetails} />
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}
