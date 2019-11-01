import React from "react";
import HomeLinks from "./HomeLinks";
import AdminLoggedInLinks from "./loggedInLinks/AdminLoggedInLinks";
import { connect } from "react-redux";
import StudentLoggedInLinks from "./loggedInLinks/StudentLoggedInLinks";
import CompanyLoggedInLinks from "./loggedInLinks/CompanyLoggedInLinks";

class Navbar extends React.Component {
  state = {
    name: ""
  };
  
  componentWillMount() {
    if (localStorage.getItem("COMPANY_TOKEN")) {
      this.setState({
        name: "company"
      });
    } else if (localStorage.getItem("STUDENT_TOKEN")) {
      this.setState({
        name: "student"
      });
    } else if (localStorage.getItem("ADMIN_TOKEN")) {
      this.setState({
        name: "admin"
      });
    } else {
      this.setState({
        name: ""
      });
    }
  }

  render(){

    if (this.state.name === "company") {
      return <CompanyLoggedInLinks />;
    } else if (this.state.name==='admin') {
      return <AdminLoggedInLinks />;
    } else if (this.state.name === "student") {
      return <StudentLoggedInLinks />;
    }
    return <HomeLinks />;
  }
}

const mapStateToProps = state => {
  if (state.auth.authError === "Admin Login Successfull") {
    const adminId = state.auth.data.data.adminData;
    return adminId;
  } else return state;
};
export default connect(mapStateToProps)(Navbar);
