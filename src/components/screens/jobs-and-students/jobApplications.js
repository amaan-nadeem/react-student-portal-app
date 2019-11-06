import React from "react";
import { Button } from "reactstrap";
import "../companies/companies.css";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
class JobApplications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobApplications: [],
      error: ""
    };
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
        "https://jobzillaa.herokuapp.com/api/v1/company/job-applications",
        {
          headers: { "x-auth-header": token }
        }
      );

      // checking jobs
      if (response.data.jobApplications.length === 0) {
        this.setState({
          error: "No Student Yet Applied to any of your Created job"
        });
      } else {
        this.setState({
          error: ""
        });
      }

      this.setState({
        isLoading: false,
        name: "company",
        jobApplications: response.data.jobApplications
      });
    } else if (localStorage.getItem("ADMIN_TOKEN")) {
      // loading screen
      this.setState({
        name: "admin"
      });
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
    
    if(this.props.auth.authError === "logged-out"){
      return <Redirect to = "/" />
    }
    if (this.state.name === "company") {
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
            <h2>JOB APPLICATIONS</h2>
            {!this.state.error ? (
              <div className="each-companies">
                {this.state.jobApplications.map((student, index) => {
                  return (
                    <div className={`company-${index} sub-companies`}>
                      <h1>{`${student.createdBy.studentName.toUpperCase()} ${student.createdBy.fatherName.toUpperCase()}`}</h1>
                      <p>
                        <span>Applied for the Postion Of: </span>
                        {student.jobId.requiredPosition}
                      </p>
                      <p>
                        <span>Required Experience for the Job: </span>
                        {student.jobId.requiredExperience}
                      </p>
                      <p>
                        <span>
                          Total Job Experience of{" "}
                          {student.createdBy.studentName}:{" "}
                        </span>
                        {student.totalExperience}
                      </p>
                      <p>
                        <span>Experience in required field : </span>
                        {student.experienceInSpecifiedField}
                      </p>
                      <p>
                        <span>Studying in: </span>
                        {student.createdBy.collegeName}
                      </p>
                      <p>
                        <span>Majors: </span>
                        {student.createdBy.majors.map((major, index) => {
                          return <em>{major}</em>;
                        })}
                      </p>
                      <Button onClick={() => this.Delete(student._id, index)}>
                        Accept
                      </Button>
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
export default connect(mapStateToProps)(JobApplications);
