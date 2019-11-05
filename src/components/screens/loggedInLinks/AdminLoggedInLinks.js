import React from "react";
import "../../../fonts/css/all.css";
import {
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "./../styles/navbar.css";
import { Button } from "antd";
import Axios from "axios";
import { Redirect, Link } from "react-router-dom";

class AdminLoggedInLinks extends React.Component {
  onClick = () => {
    const navlink = document.getElementById("navlinks");
    if (navlink.className === "navlinks") {
      document.getElementById("navlinks").className = "dropDownNavlinks";
    } else document.getElementById("navlinks").className = "navlinks";
    console.log(document.getElementById("navlinks").className);
  };

  signout = () => {
    localStorage.removeItem("ADMIN_TOKEN");
    window.location.reload();
  };

  async componentWillMount() {
    if (localStorage.getItem("COMPANY_TOKEN")) {
      this.setState({
        name: "company"
      });
    } else if (localStorage.getItem("ADMIN_TOKEN")) {
      // loading screen
      this.setState({
        isLoading: true,
        name: "admin"
      });
      // getting response back
      const token = localStorage.getItem("ADMIN_TOKEN");
      const response = await Axios.get(
        "https://jobzillaa.herokuapp.com/api/v1/admin/profile",
        {
          headers: { "x-auth-header": token }
        }
      );

      this.setState({
        isLoading: false,
        name: "admin",
        adminName: response.data.adminProfile.adminName[0]
      });
      console.log(response);
    } else if (localStorage.getItem("STUDENT_TOKEN")) {
      this.setState({
        name: "student"
      });
    } else {
      this.setState({
        name: "home"
      });
    }
  }

  render() {
    if (this.state.name === "admin") {
      if (!this.state.isLoading) {
        return (
          <div className="navbar">
            <div className="logo">
              <NavbarBrand>
                <img
                  src={require("../../../images/logo.png")}
                  width="100px"
                  height="60px"
                  alt="70px"
                />
              </NavbarBrand>
            </div>
            <button onClick={this.onClick}>
              <i class="fas fa-angle-double-down"></i>
            </button>
            <div className="navlinks" id="navlinks">
              <ul>
                <Link className="link " to="/dashboard">
                  Home
                </Link>
                <Link className="link " to="/companies">
                  Companies
                </Link>
                <Link className="link " to="/jobs">
                  Jobs
                </Link>
                <Link className="link " to="/students">
                  Students
                </Link>
                <UncontrolledDropdown className="profile-link link">
                  <DropdownToggle
                    style={{ color: "black", fontWeight: "bold" }}
                    nav
                  >
                    {this.state.adminName.toUpperCase()}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <Link to="/profile">Admin Profile</Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <Button className="logout" onClick={this.signout}>
                        Logout
                      </Button>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <Link className="profile-s-link" href="/admin-profile">
                  Admin Profile
                </Link>
                <Link className="navlink-s-button">
                  <Button className="logout-s-screen" onClick={this.signout}>
                    Logout
                  </Button>
                </Link>
              </ul>
            </div>
          </div>
        );
      } else return <></>;
    } else return <Redirect to="/" />;
  }
}

export default AdminLoggedInLinks;
