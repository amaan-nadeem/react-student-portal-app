import React from "react";
import "../../../fonts/css/all.css";
import { 
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";
import "./../styles/navbar.css";
import Axios from "axios";
import { Redirect, Link } from "react-router-dom";

class StudentLoggedInLinks extends React.Component {
  onClick = () => {
    const navlink = document.getElementById("navlinks");
    if (navlink.className === "navlinks") {
      document.getElementById("navlinks").className = "dropDownNavlinks";
    } else document.getElementById("navlinks").className = "navlinks";
    console.log(document.getElementById("navlinks").className);
  };

  signout = () => {
    localStorage.removeItem("STUDENT_TOKEN");
    window.location.reload();
  };

  async componentWillMount() {
    if (localStorage.getItem("COMPANY_TOKEN")) {
      this.setState({
        name: "company"
      });
    } else if (localStorage.getItem("STUDENT_TOKEN")) {
      // loading screen
      this.setState({
        isLoading: true,
        name: "student"
      });

      // getting response back
      const token = localStorage.getItem("STUDENT_TOKEN");
      const response = await Axios.get(
        "https://jobzillaa.herokuapp.com/api/v1/student/profile",
        {
          headers: { "x-auth-header": token }
        }
      );

      this.setState({
        isLoading: false,
        name: "student",
        studentName: response.data.studentProfile.studentName[0]
      });
    } else if (localStorage.getItem("ADMIN_TOKEN")) {
      this.setState({
        name: "admin"
      });
    } else {
      this.setState({
        name: "home"
      });
    }
  }

  render() {
    if (this.state.name === "student") {
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
                <Link className="link " to="jobs">
                  Jobs
                </Link>
                <Link className="link " to="contact">
                 Applied Jobs
                </Link>
                <UncontrolledDropdown className="profile-link link">
                  <DropdownToggle
                    style={{ color: "black", fontWeight: "bold" }}
                    nav
                  >
                    {this.state.studentName.toUpperCase()}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <Link to="/student-profile">Student Profile</Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <Button className="logout" onClick={this.signout}>
                        Logout
                      </Button>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                
              </ul>
            </div>
          </div>
        );
      } else return <></>;
    } else return <Redirect to="/" />;
  }
}

export default StudentLoggedInLinks;
