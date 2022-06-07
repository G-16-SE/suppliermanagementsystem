import React, { useEffect, useState } from "react";
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
import AddGood from "./AddNewGood";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/auth";

export default function Good() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [goods, setGoods] = useState([]);
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
      .get("http://localhost:8087/good/allgoods", { withCredentials: true })

      .then((getGoods) => {
        setGoods(getGoods.data.data);
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
  }, [goods]);

  return (
    <React.Fragment>
      <div className="Container-fluid shadow ">
        <h2>Goods</h2>
        <br></br>
        <Alert isOpen={show} color="danger" toggle={setShowToFalse}>
          <p>{alertMessage}</p>
        </Alert>
        <Button
          outline
          color="dark"
          className="shadow-sm"
          onClick={setModalIsOpenToTrue}
        >
          {" "}
          Add New Good Type{" "}
        </Button>
        <br></br>
        <br></br>

        <Row>
          <CardGroup>
            {goods.map((good, index) => (
              <Col sm="4">
                <Card
                  key={good.id}
                  className="shadow"
                  style={{
                    margin: "0.5rem",
                    border: "0px",
                    backgroundColor: "rgba(98, 126, 141, 0.34)",
                    height: "50vh",
                  }}
                >
                  <CardBody style={{ borderRadius: "5px" }}>
                    <CardImg
                      style={{ maxHeight: "30vh", maxWidth: "auto" }}
                      // className="img-fluid"
                      src={`http://localhost:8087/img/${good.image}`}
                      alt="..."
                      position="top"
                      width="auto"
                    ></CardImg>
                    <br></br>
                    <br></br>
                    <CardTitle>{good.type}</CardTitle>
                    <CardText>
                      ID : <b>{good.id}</b>
                      <br></br>
                      Unit : {good.unit}
                    </CardText>
                    {/* <Button
                    outline
                    color="dark"
                    onClick={() => getDeleteID(good.id)}
                  >
                    Delete
                  </Button> */}
                  </CardBody>
                </Card>
              </Col>
            ))}
          </CardGroup>
        </Row>
      </div>
      <Modal isOpen={modalIsOpen}>
        <ModalHeader
          close={<Button close onClick={setModalIsOpenToFalse}></Button>}
        >
          <h3>New Good Type </h3>
        </ModalHeader>
        <ModalBody>
          <AddGood />
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}
