import React from "react";
import "../../companies/companies.css";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
class AppliedJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobApplications: [],
      error: ""
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
        name: "admin"
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
        "https://jobzillaa.herokuapp.com/api/v1/student/applied-jobs",
        {
          headers: { "x-auth-header": token }
        }
      );

      // checking jobs
      if (response.data.appliedJobs.length === 0) {
        this.setState({
          error: `You have'nt applied to any Job yet!`
        });
      } else {
        this.setState({
          error: ""
        });
      }

      this.setState({
        isLoading: false,
        name: "student",
        appliedJobs: response.data.appliedJobs
      });
    } else {
      this.setState({
        name: "home"
      });
    }
  }

  //   Delete = async (i, index) => {

  //      if(localStorage.getItem('ADMIN_TOKEN')){
  //         // getting response back
  //       const token = localStorage.getItem("ADMIN_TOKEN");
  //           await Axios.delete(`https://jobzillaa.herokuapp.com/api/v1/admin/delete-student/${i}`,{
  //                 headers: {'x-auth-header': token}
  //             });
  //         }

  //     const studentToDelete = this.state.students[index];
  //     const students = this.state.students.filter((student) => {
  //         return student !== studentToDelete
  //     })

  //     this.setState({
  //       students
  //     })
  //   }

  render() {
    if (this.props.auth.authError === "logged-out") {
      return <Redirect to="/" />;
    }
    if (this.state.name === "student") {
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
            <h2>APPLIED FOR THE JOBS OF</h2>
            {!this.state.error ? (
              <div className="each-companies">
                {this.state.appliedJobs.map((job, index) => {
                  return (
                    <div className={`company-${index} sub-companies`}>
                      <h1>{`${job.createdFor.companyName.toUpperCase()}`}</h1>
                      <p>
                        <span>Applied for the Postion Of: </span>
                        {job.jobId.requiredPosition}
                      </p>
                      <p>
                        <span>Required Experience for the Job: </span>
                        {job.jobId.requiredExperience}
                      </p>
                      <p>
                        <span>Your Total Experience: </span>
                        {job.totalExperience}
                      </p>
                      <p>
                        <span>
                          Your experience as a {job.jobId.requiredPosition}:{" "}
                        </span>
                        {job.experienceInSpecifiedField}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  padding: "5px"
                }}
              >
                {this.state.error}
              </p>
            )}
          </div>
        );
      }
    } else return <Redirect to="/dashboard" />;
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(AppliedJobs);
