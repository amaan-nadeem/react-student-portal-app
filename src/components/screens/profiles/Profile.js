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
      this.setState({
        isloading: true,
        name: "company"
      });
      const token = localStorage.getItem("COMPANY_TOKEN");
      const response = await Axios.get(
        "https://jobzillaa.herokuapp.com/api/v1/company/profile",
        {
          headers: { "x-auth-header": token }
        }
      );
      this.setState({
        isloading: false,
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
        isloading: true,
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
        isloading:false,
        studentName: response.data.studentProfile.studentName,
        fatherName:response.data.studentProfile.fatherName,
        collegeName: response.data.studentProfile.collegeName,
        email: response.data.studentProfile.email,
        majors:response.data.studentProfile.majors,
        gender: response.data.studentProfile.gender
      });
    } else if (localStorage.getItem("ADMIN_TOKEN")) {
      this.setState({
        isloading: true,
        name: "admin"
      })
      const token = localStorage.getItem("ADMIN_TOKEN");
      const response = await Axios.get(
        "https://jobzillaa.herokuapp.com/api/v1/admin/profile",
        {
          headers: { "x-auth-header": token }
        }
      );
      this.setState({
        isloading: false,
        adminName: response.data.adminProfile.adminName,
        email: response.data.adminProfile.email
      });
    } else {
      this.setState({
        token: false,
        name: "noone"
      });
    }
  }
  render() {
    console.log(this.state);
    const profile = this.state.name;
    if (profile === "admin") {
      if(this.state.isloading){
        return (
          <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
          </div>
      )
      } return (
        <div className="profile">
          <div className="company">
            <h1 className="profile-info">Profile Information</h1>
            <div className="company-avatar">
            <img
              src={require("../../../images/admin-avatar.png")}
              style={{ borderRadius: "50%" }}
              width="200px"
              height="200px"
              alt="404 not found!"
            />
          </div>
            <h1
              style={{ color: "black", fontWeight: "bold" }}
              className="title"
            >
              {this.state.adminName}
            </h1>
            <h1>
              EMAIL: <span> {this.state.email}</span>
            </h1>
            
            
          </div>
        </div>
      );
    } else if (profile === "company") {
      if(this.state.isloading){
        return (
          <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
          </div>
      )
      } return (
        <div className="profile">
          <div className="company">
            <h1 className="profile-info">Profile Information</h1>
            <div className="company-avatar">
            <img
              src={require("../../../images/company-avatar.png")}
              style={{ borderRadius: "50%" }}
              width="200px"
              height="200px"
              alt="404 not found!"
            />
          </div>
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
      if(this.state.isloading){
        return (
          <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
          </div>
      )
      } return (
        <div className="profile">
          <div className="company">
            <h1 className="profile-info">Profile Information</h1>
            <div className="company-avatar">
           {this.state.gender ==='male' ?
            <img
              src={require("../../../images/male-avatar.jpg")}
              style={{ borderRadius: "50%" }}
              width="200px"
              height="200px"
              alt="404 not found!"
            />
            : 
            <img
            src={require("../../../images/female-avatar.jpg")}
            style={{ borderRadius: "50%" }}
            width="200px"
            height="200px"
            alt="404 not found!"
          />
           }
          </div>
            <h1
              style={{ color: "black", fontWeight: "bold" }}
              className="title"
            >
              {this.state.studentName} {this.state.fatherName}
            </h1>
            <h1>
              EMAIL: <span> {this.state.email}</span>
            </h1>
            <h1>
              College Name: 
              <span> {this.state.collegeName}</span>
            </h1>
            <h1>
              Major: <span> {this.state.majors}</span>
            </h1>
            
          </div>
        </div>
      );
    } else return <Redirect to="/dashboard" />;
  }
}

export default Profile;
