import React from "react";
import "../../fonts/css/all.css";
import {
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Link } from "react-router-dom";
import "./styles/navbar.css";
import Fade from 'react-reveal/Fade';


class HomeLinks extends React.Component {
  onClick = () => {
    const navlink = document.getElementById("navlinks");
    if (navlink.className === "navlinks") {
      document.getElementById("navlinks").className = "dropDownNavlinks";
    } else document.getElementById("navlinks").className = "navlinks";
    console.log(document.getElementById("navlinks").className);
  };

  render() {
    return (
      <div className="navbar">
          <Fade>
        <div className="logo">
          <NavbarBrand>
            <img
              src={require("../../images/logo.png")}
              width="100px"
              height="60px"
              alt="404 not Found"
            />
          </NavbarBrand>
        </div>
        <button onClick={this.onClick}>
          <i class="fas fa-angle-double-down"></i>
        </button>
        <div className="navlinks" id="navlinks">
          <ul>
            <Link className="link " to="/">
              Home
            </Link>
            <Link className="link " to="about">
              About
            </Link>
            <UncontrolledDropdown className="signup-link link">
              <DropdownToggle
                style={{ color: "rgb(182, 177, 177)", fontWeight: "bold", padding: '0' }}
                nav
              >
                Signup
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <Link to="/company-signup">As a Company</Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <Link to="/student-signup">As a Student</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown className="link">
              <DropdownToggle
                style={{ color: "rgb(182, 177, 177)", fontWeight: "bold",padding: '0' }}
                nav
              >
                Login
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <Link to="/admin-login">Admin Login</Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <Link to="/company-login">Company Login</Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <Link to="/student-login">Student Login</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </ul>
        </div>
      </Fade>
      </div>
      
    );
  }
}

export default HomeLinks;
