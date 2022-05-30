import React, { useState, useEffect } from "react";
import { useRowSelect, useTable } from "react-table";
import { Button, Table, Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import { Checkbox } from "./checkbox";

const COLUMNS = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Contact Number",
    accessor: "contactno",
  },
  {
    Header: "Joined Date",
    accessor: "joineddate",
  },
];

// const supplymanagers = [
//   {
//     id: 100,
//     name: "Kamal",
//     email: "kamal@gmail.com",
//     contactno: "0759862565",
//     joineddate: "2015-10-18",
//   },
//   {
//     id: 100,
//     name: "Nimal",
//     email: "nimal@gmail.com",
//     contactno: "0759862565",
//     joineddate: "2015-10-18",
//   },
// ];

export default function SupplyManagersTable() {

  const [supplymanagers, setSupplyManagers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/supplier/getManagers")
      .then(getManagers => {
        setSupplyManagers(getManagers.data);
        console.log(getManagers)
      }).catch(err => {
        console.log(err)
      })
  }, [])

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalId, setModalId] = useState(1);

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  function viewModal(Id) {
    console.log(Id);
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
    selectedFlatRows,
  } = useTable(
    {
      columns: COLUMNS,
      data: supplymanagers,
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
          {
            id: "edit",
            Cell: ({ row }) => (
              <Button outline color="dark" onClick={() => viewModal(row.id)}>Edit</Button>
            ),
          }, 
        ];
      });
    }
  );

  const selectedrows = selectedFlatRows.map((row) => row.original);

  return (
    <div>
      <Table
        responsive
        striped
        bordered
        hover
        className="Mytable"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
        <ModalHeader close={<Button close onClick={setModalIsOpenToFalse}></Button>}>
          <h3>Edit Supply Manager</h3>
        </ModalHeader>
        <ModalBody>{modalId}</ModalBody>
      </Modal>
    </div>
  );
}