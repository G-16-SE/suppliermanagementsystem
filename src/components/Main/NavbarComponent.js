import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import { useAuth } from "../../utils/auth";

export default function NavigationBar() {
  const auth = useAuth();

  return (
    <Navbar dark>
      <Nav navbar>
        <hr></hr>
        <NavItem>
          <NavLink style={{ color: "#fff" }} className="nav-link" to="home">
            <span className="fa fa-home fa-lg"></span> HOME
          </NavLink>
        </NavItem>
        <hr></hr>
        <NavItem>
          <NavLink style={{ color: "#fff" }} className="nav-link" to="storage">
            <span className="fa fa-archive fa-lg"></span> STORAGE
          </NavLink>
        </NavItem>
        <hr></hr>
        {auth.role === "Admin" && (
          <React.Fragment>
            <NavItem>
              <NavLink
                style={{ color: "#fff" }}
                className="nav-link"
                to="supplymanagers"
              >
                <span className="fa fa-user fa-lg"></span> SUPPLY MANAGERS
              </NavLink>
            </NavItem>
            <hr></hr>
          </React.Fragment>
        )}

        <NavItem>
          <NavLink
            style={{ color: "#fff" }}
            className="nav-link"
            to="suppliers"
          >
            <span className="fa fa-vcard fa-lg"></span> SUPPLIERS
          </NavLink>
        </NavItem>
        <hr></hr>
        <NavItem>
          <NavLink
            style={{ color: "#fff" }}
            className="nav-link"
            to="supplyrecords"
          >
            <span className="fa fa-list-alt fa-lg"></span> SUPPLY RECORDS
          </NavLink>
        </NavItem>
        <hr></hr>
        <NavItem>
          <NavLink style={{ color: "#fff" }} className="nav-link" to="goods">
            <span className="fa fa-shopping-basket fa-lg"></span> GOODS
          </NavLink>
        </NavItem>
        <hr></hr>
        {auth.role === "Manager" && (
          <React.Fragment>
            <NavItem>
              <NavLink
                style={{ color: "#fff" }}
                className="nav-link"
                to="editaccountdetails"
              >
                <span className="fa fa-cogs fa-lg"></span> ACCOUNT DETAILS
              </NavLink>
            </NavItem>
            <hr></hr>
          </React.Fragment>
        )}
      </Nav>
    </Navbar>
  );
}
