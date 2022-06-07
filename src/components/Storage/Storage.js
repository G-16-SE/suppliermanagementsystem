import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Col,
  Row,
  CardGroup,
} from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, Alert } from "reactstrap";
import "../../styles/styles_2.css";
import EditStorage from "./EditStorage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/auth";

export default function Storage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalId, setModalId] = useState(0);
  const [storage, setStorage] = useState([]);
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

  function viewModal(Id) {
    setModalIsOpenToTrue();
    if (modalIsOpen === false) {
      setModalId(Id);
    }
  }

  const dateFormatter = (date) => {
    return date.split("T")[0];
  };

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:8087/storage/all", { withCredentials: true })
      .then((getItem) => {
        let data = [];
        getItem.data.data.forEach((m) => {
          m.last_refilled_date = dateFormatter(m.last_refilled_date);
          data.push(m);
        });
        setStorage(data);
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
  }, [storage]);

  return (
    <React.Fragment>
      <div className="Container-fluid shadow ">
        <h2>Storage</h2>
        <br></br>
        <Alert isOpen={show} color="danger" toggle={setShowToFalse}>
          <p>{alertMessage}</p>
        </Alert>
        <Row>
          <CardGroup>
            {storage.map((good, index) => (
              <Col sm="4">
                <center>
                  <Card
                    key={good.id}
                    className="shadow"
                    style={{
                      margin: "0.5rem",
                      border: "0px",
                      backgroundColor: "rgba(98, 126, 141, 0.34)",
                      height: "70vh",
                    }}
                  >
                    <CardBody
                      className="shadow-5 hover-overlay"
                      style={{ borderRadius: "5px" }}
                    >
                      <CardTitle>{good.type}</CardTitle>
                      <CardText>
                        <b>{good.unit_price}</b>
                        <br></br>Unit : {good.unit}
                      </CardText>
                      <CardImg
                        style={{ maxHeight: "30vh", maxWidth: "auto" }}
                        src={`http://localhost:8087/img/${good.image}`}
                        alt="..."
                        position="top"
                        width="auto"
                      ></CardImg>
                      <br></br>
                      <br></br>
                      <CardText>
                        Stock Amount : <b>{good.stock_amount}</b>
                        <br></br>
                        Last Refilled Date : {good.last_refilled_date}
                        <br></br>
                      </CardText>
                      <Button
                        className="shadow-sm"
                        outline
                        color="dark"
                        onClick={() => viewModal(good.id)}
                      >
                        Edit
                      </Button>
                    </CardBody>
                  </Card>
                </center>
              </Col>
            ))}
          </CardGroup>
        </Row>
      </div>
      <Modal isOpen={modalIsOpen}>
        <ModalHeader
          close={<Button close onClick={setModalIsOpenToFalse}></Button>}
        >
          <h3> Edit Storage </h3>
        </ModalHeader>
        <ModalBody>{<EditStorage id={modalId} storage={storage} />}</ModalBody>
      </Modal>
    </React.Fragment>
  );
}
