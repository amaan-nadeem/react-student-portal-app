import React from "react";
import { Jumbotron, Container } from "reactstrap";
import "./dashboardStyle.css";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";
import { Button } from "reactstrap";
import { connect } from 'react-redux';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentWillMount() {
    if (localStorage.getItem("COMPANY_TOKEN")) {
      // loading screen

      this.setState({
        isLoading: true,
        name: "company"
      });
      // getting response back
      const token = localStorage.getItem("COMPANY_TOKEN");
      const response = await Axios.get(
        "https://jobzillaa.herokuapp.com/api/v1/company/profile",
        {
          headers: { "x-auth-header": token }
        }
      );

      this.setState({
        isLoading: false,
        name: "company",
        companyName: response.data.companyProfile.companyName
      });
    } else if (localStorage.getItem("STUDENT_TOKEN")) {
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
        studentName: response.data.studentProfile.studentName,
        isLoading: false,
        name: "student",
      });
    } else if (localStorage.getItem("ADMIN_TOKEN")) {

      this.setState({
        isLoading: true,
        name: "admin"
      })

      setTimeout(() => {
        this.setState({
          isLoading:false
        })
      }, 500);
      
    } else {
      this.setState({
        token: false,
        name: "home"
      });
    }
  }

  render() {
    console.log(this.props);
    if(this.props.auth.authError === "logged-out"){
      return <Redirect to = "/" />
    }
    if (this.state.name === "student") {
      if (this.state.isLoading) {
        return (
            <div class="spinner">
              <div class="double-bounce1"></div>
              <div class="double-bounce2"></div>
            </div>
        );
       } else
        return (
          <div>
            <Jumbotron className="jumbotron-student" fluid>
              <Container className="container-header" fluid>
                <h1 className="display-3">HELLO! {this.state.studentName}</h1>
                <p className="lead">
                  We Are Pleased to welcome you on our Portal.
                </p>
                <div className ="dashboard-buttons">
               <Link to="/companies"><Button>Companies</Button></Link> 
               <Link to="/jobs"><Button>See Posted Jobs</Button></Link>
                </div>
              </Container>
            </Jumbotron>
          </div>
        );
    } else if (this.state.name === "company") {
      if (this.state.isLoading) {
        return (
            <div class="spinner">
              <div class="double-bounce1"></div>
              <div class="double-bounce2"></div>
            </div>
        );
      } else
        return (     
          <div>
            <Jumbotron className="jumbotron-company" fluid>
              <Container className="container-header" fluid>
                <h1 className="display-3">HELLO! {this.state.companyName}</h1>
                <p className="lead">
                  We Are Pleased to welcome you on our Portal.
                </p>
                <div className ="dashboard-buttons">
               <Link to="/created-jobs"><Button>Created Jobs</Button></Link> 
               <Link to="/create-jobs"><Button>Create Job</Button></Link>
                </div>
              </Container>
            </Jumbotron>
          </div>
        );
    } else if (this.state.name === "admin") {
      if (this.state.isLoading) {
        return (
            <div class="spinner">
              <div class="double-bounce1"></div>
              <div class="double-bounce2"></div>
            </div>
        )
      } return (
        <div>
          <Jumbotron className="jumbotron-admin" fluid>
            <Container className="container-header" fluid>
              <h1 className="display-3">HELLO! ADMIN</h1>
              <p className="lead">
                This Portal is all your. We appreciate your services for this Country
              </p>
              <div className ="dashboard-buttons">
               <Link to="/jobs"><Button>Total Created Jobs</Button></Link> 
               <Link to="/companies"><Button>Registered Companies</Button></Link>
               <Link to="/students"><Button>Registered Students</Button></Link>
                </div>
            </Container>
          </Jumbotron>
        </div>
      );
    } else return <Redirect to="/" />;
  }
}

const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps)(Dashboard);
