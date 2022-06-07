import React, { useState, useEffect } from "react";
import { useTable, useGlobalFilter } from "react-table";
import {
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  Alert,
} from "reactstrap";
import axios from "axios";
import EditSupplyRecords from "./EditSupplyRecord";
import { GlobalFilter } from "../Utils/GlobalFilter";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/auth";

const COLUMNS = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Supplier ID",
    accessor: "supplier_id",
  },
  {
    Header: "Unit Price",
    accessor: "unit_prize",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Type",
    accessor: "type",
  },
  {
    Header: "Received Date",
    accessor: "received_date",
  },
];

export default function SupplyRecordsTable() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [supplyrecords, setSupplyRecords] = useState([]);
  const [show, setShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const setShowToTrue = () => {
    setShow(true);
  };

  const setShowToFalse = () => {
    setShow(false);
  };

  const dateFormatter = (date) => {
    return date.split("T")[0];
  };

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:8087/supplyRecord/all", { withCredentials: true })
      .then((getRecords) => {
        let data = [];
        getRecords.data.data.forEach((m) => {
          m.received_date = dateFormatter(m.received_date);
          data.push(m);
        });
        setSupplyRecords(data);
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
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalId, setModalId] = useState(1);

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
    //window.location.reload(false);
  };

  function viewModal(Id) {
    setModalIsOpenToTrue();
    if (modalIsOpen === false) {
      setModalId(Id);
    }
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns: COLUMNS,
      data: supplyrecords,
    },
    useGlobalFilter,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          ...columns,
          {
            id: "edit",
            Cell: ({ row }) => (
              <Button outline color="dark" onClick={() => viewModal(row.id)}>
                Edit
              </Button>
            ),
          },
        ];
      });
    }
  );

  const { globalFilter } = state;

  return (
    <React.Fragment>
      <Alert isOpen={show} color="danger" toggle={setShowToFalse}>
        <p>{alertMessage}</p>
      </Alert>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <br></br>
      <div>
        <Table
          responsive
          striped
          bordered
          hover
          className="Mytable table-striped shadow-sm table-striped shadow-sm"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Modal isOpen={modalIsOpen}>
          <ModalHeader
            close={<Button close onClick={setModalIsOpenToFalse}></Button>}
          >
            <h3>Edit Supply Record</h3>
          </ModalHeader>
          <ModalBody>
            <EditSupplyRecords row={modalId} supplyrecords={supplyrecords} />
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
}
