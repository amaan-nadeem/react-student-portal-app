import React from "react";
import { Button } from "reactstrap";
import "./companies.css";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
class Companies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: []
    };
  }

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
        "https://jobzillaa.herokuapp.com/api/v1/admin/companies",
        {
          headers: { "x-auth-header": token }
        }
      );

      this.setState({
        isLoading: false,
        name: "admin",
        companies: response.data.companies
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
        "https://jobzillaa.herokuapp.com/api/v1/student/companies",
        {
          headers: { "x-auth-header": token }
        }
      );

      this.setState({
        isLoading: false,
        name: "student",
        companies: response.data.companies
      });

      this.setState({
        isLoading: false,
        name: "student"
      });
    } else {
      this.setState({
        name: "home"
      });
    }
  }

  Delete = async (i, index) => {
    if (localStorage.getItem("ADMIN_TOKEN")) {
      // getting response back
      const token = localStorage.getItem("ADMIN_TOKEN");
      await Axios.delete(
        `https://jobzillaa.herokuapp.com/api/v1/admin/delete-company/${i}`,
        {
          headers: { "x-auth-header": token }
        }
      );
    }

    const companyToDelete = this.state.companies[index];
    const companies = this.state.companies.filter(company => {
      return company !== companyToDelete;
    });

    this.setState({
      companies
    });
  };

  render() {
    if (this.props.auth.authError === "logged-out") {
      return <Redirect to="/" />;
    }

    if (this.state.name === "admin" || this.state.name === "student") {
      if (this.state.isLoading) {
        return (
          <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
          </div>
        );
      } else {
        return (
          <div className="companies-main">
            <h2>Companies Data</h2>
            <div className="each-companies">
              {this.state.companies.map((company, index) => {
                return (
                  <div className={`company-${index} sub-companies`}>
                    <h1>{company.companyName}</h1>
                    <p>
                      <span>Email: </span>
                      {company.email}
                    </p>
                    <p>
                      <span>Company Address: </span>
                      {company.companyAddress}
                    </p>
                    <p>
                      <span>Buisness Phone Number: </span>
                      {company.buisnessPhoneNumber}
                    </p>
                    <p>
                      <span>Buisness Details: </span>
                      {company.buisnessDetails}
                    </p>
                    <p>
                      <span>City: </span>
                      {company.city}
                    </p>

                    {this.state.name === "admin" ? (
                      <Button onClick={() => this.Delete(company._id, index)}>
                        Delete
                      </Button>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
    } else return <Redirect to="/" />;
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(Companies);
