import React from "react";
import jwt_decode from "jwt-decode";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import "./profile.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentWillMount() {
     if (localStorage.getItem("COMPANY_TOKEN")) {
         const token = localStorage.getItem("COMPANY_TOKEN");
         const response = await Axios.get(
             "https://jobzillaa.herokuapp.com/api/v1/company/profile",
             {
                 headers: { "x-auth-header": token }
                }
                );
        this.setState({
        name: "company"
        });
      const profile = response.data.companyProfile;
      this.setState({
        buisnessDetails: profile.buisnessDetails,
        buisnessPhoneNumber: profile.buisnessPhoneNumber,
        city: profile.city,
        companyName: profile.companyName,
        companyAddress: profile.companyAddress,
        email: profile.email
      });
    } else if (localStorage.getItem("STUDENT_TOKEN")) {
      this.setState({
        name: "student"
      });
      const token = localStorage.getItem("STUDENT_TOKEN");
      const response = await Axios.get(
        "https://jobzillaa.herokuapp.com/api/v1/student/profile",
        {
          headers: { "x-auth-header": token }
        }
      );
      this.setState({

      })
    } else if (localStorage.getItem("ADMIN_TOKEN")) {
      this.setState({
        name: "admin"
      });
    } else {
      this.setState({
        token: false,
        name: "noone"
      });
    }
  }
  render() {
    const profile = this.state.name;
    if (profile === "admin") {
      return (
        <div className="profile">
          <div className="avatar">
            <img
              src={require("../../../images/profile.png")}
              style={{ borderRadius: "50%" }}
              width="200px"
              height="200px"
            />
          </div>

          <h1 style={{ color: "black", fontWeight: "bold" }}>Amaan Nadeem</h1>
          <h1 style={{ color: "crimson" }}>
            EMAIL:{" "}
            <span style={{ fontSize: "30px", color: "black" }}>
              {" "}
              amaannadeem@outlook.com
            </span>
          </h1>
        </div>
      );
    } else if (profile === "company") {
      return (
        <div className="profile">
          <div className="company">
            <h1 className="profile-info">Profile Information</h1>
            <h1
              style={{ color: "black", fontWeight: "bold" }}
              className="title"
            >
              {this.state.companyName}
            </h1>
            <h1>
              EMAIL: <span> {this.state.email}</span>
            </h1>
            <h1>
              Buisness Phone Number:{" "}
              <span> {this.state.buisnessPhoneNumber}</span>
            </h1>
            <h1>
              Buisness Details: <span> {this.state.buisnessDetails}</span>
            </h1>
            <h1>
              Company Address: <span> {this.state.companyAddress}</span>
            </h1>
            <h1>
              City: <span> {this.state.city}</span>
            </h1>
          </div>
        </div>
      );
    } else if (profile === "student") {
      return <div>Hello Student</div>;
    } else return <Redirect to="/" />;
  }
}

export default Profile;
