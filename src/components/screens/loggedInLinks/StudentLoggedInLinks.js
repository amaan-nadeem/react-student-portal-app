import React from "react";
import "../../../fonts/css/all.css";
import { 
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Button } from "antd";
import "./../styles/navbar.css";
import Axios from "axios";
import { Redirect, Link } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import {connect} from 'react-redux';
import { studentLogin } from "../../store/actions/authActions";


class StudentLoggedInLinks extends React.Component {
  onClick = () => {
    const navlink = document.getElementById("navlinks");
    if (navlink.className === "navlinks") {
      document.getElementById("navlinks").className = "dropDownNavlinks";
    } else document.getElementById("navlinks").className = "navlinks";
    console.log(document.getElementById("navlinks").className);
  };

  signout = () => {
    localStorage.removeItem('STUDENT_TOKEN');
    this.props.student("logout"); 
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
    if(this.props.auth.token){
    const decode = jwt_decode(this.props.auth.token)
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
                <Link className="link " to="/applied-jobs">
                 Applied Jobs
                </Link>
                <UncontrolledDropdown className="profile-link link">
                  <DropdownToggle
                    style={{ color: "black", fontWeight: "bold" }}
                    nav
                  >
                    {decode.student.email[0].toUpperCase()}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <Link to="/profile">Student Profile</Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <Button className="logout" onClick={this.signout}>
                        Logout
                      </Button>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <Link className="profile-s-link" to="/profile">
                  Student Profile
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
    }

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
                <Link className="link " to="/jobs">
                  Jobs
                </Link>
                <Link className="link " to="/applied-jobs">
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
                      <Link to="/profile">Student Profile</Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <Button className="logout" onClick={this.signout}>
                        Logout
                      </Button>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <Link className="profile-s-link" to="/profile">
                  Student Profile
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

const mapStateToProps = state => {
  return state
};

const mapDispatchToProps = (dispatch) => {
  return {
    student: student => dispatch(studentLogin(student))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(StudentLoggedInLinks);
