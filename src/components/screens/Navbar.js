import React from "react";
import HomeLinks from "./HomeLinks";
import AdminLoggedInLinks from "./loggedInLinks/AdminLoggedInLinks";
import { connect } from "react-redux";
import StudentLoggedInLinks from "./loggedInLinks/StudentLoggedInLinks";
import CompanyLoggedInLinks from "./loggedInLinks/CompanyLoggedInLinks";
import jwt_decode from "jwt-decode";

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

  render() {
    if(this.props.auth.authError === "logged-out"){
      return <HomeLinks/>
    }
    if(this.props.auth.token){
    const decode = jwt_decode(this.props.auth.token);
    if(decode.student){
      return <StudentLoggedInLinks/>
    }
    else if(decode.company){
      return <CompanyLoggedInLinks/>
    }
    else if(decode.admin){
      return <AdminLoggedInLinks/>
    }
    }
    if (this.state.name === "company") {
      return <CompanyLoggedInLinks />;
    } else if (this.state.name === "admin") {
      return <AdminLoggedInLinks />;
    } else if (this.state.name === "student") {
      return <StudentLoggedInLinks />;
    }
    return <HomeLinks />;
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(Navbar);
