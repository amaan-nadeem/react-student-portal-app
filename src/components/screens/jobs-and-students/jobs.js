import React from "react";
import { Button } from "reactstrap";
import "../companies/companies.css";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import "./jobs.css";
import moment from "moment";
import {connect} from 'react-redux';

class Jobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: []
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
        "https://jobzillaa.herokuapp.com/api/v1/admin/jobs",
        {
          headers: { "x-auth-header": token }
        }
      );
      this.setState({
        isLoading: false,
        name: "admin",
        jobs: response.data.totalJobs
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
        "https://jobzillaa.herokuapp.com/api/v1/student/jobs",
        {
          headers: { "x-auth-header": token }
        }
      );
      this.setState({
        isLoading: false,
        name: "student",
        jobs: response.data.totalJobs
      });
    } else {
      this.setState({
        name: "home"
      });
    }
  }

  Delete = async (i, indexCompany, indexJob) => {
    if (localStorage.getItem("ADMIN_TOKEN")) {
      // getting response back
      const token = localStorage.getItem("ADMIN_TOKEN");
      await Axios.delete(
        `https://jobzillaa.herokuapp.com/api/v1/admin/delete-job/${i}`,
        {
          headers: { "x-auth-header": token }
        }
      );
    } else if (localStorage.getItem("STUDENT_TOKEN")) {
      // getting response back
      const token = localStorage.getItem("STUDENT_TOKEN");
      await Axios.delete(
        `https://jobzillaa.herokuapp.com/api/v1/admin/delete-job/${i}`,
        {
          headers: { "x-auth-header": token }
        }
      );
    }

    const jobToDelete = this.state.jobs[indexCompany].totalJobs[indexJob];
    const jobs = this.state.jobs[indexCompany].totalJobs.filter(job => {
      return job._id !== jobToDelete._id;
    });

    this.state.jobs[indexCompany].totalJobs = jobs;
    this.forceUpdate();
  };

  apply = i => {
    localStorage.setItem("JOB-ID", i);
    this.props.history.push("/apply-jobs");
  };

  render() {
    if(this.props.auth.authError === "logged-out"){
      return <Redirect to = "/" />
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
            <h2>Total Jobs</h2>
            <div className="jobs">
              {this.state.jobs.map((job, indexCompany) => {
                return (
                  <div className={`sub-jobs`} key={indexCompany}>
                    <h1>Jobs Posted By {job.companyName.toUpperCase()}</h1>
                    <div className="each-company-jobs">
                      {job.totalJobs.map((job, indexJob) => {
                        return (
                          <div className="each-job" key={indexJob}>
                            <p>
                              <span>Job Required For Position Of: </span>
                              {job.requiredPosition}
                            </p>
                            <p>
                              <span>Experience Required: </span>
                              {job.requiredExperience}
                            </p>
                            <p>
                              <span>Company Address: </span>
                              {job.createdBy.companyAddress}
                            </p>
                            <p>
                              <span>Posted on: </span>
                              {moment(job.createdAt).format("LLLL")}
                            </p>
                            {this.state.name === "admin" ? (
                              <Button
                                onClick={() =>
                                  this.Delete(job._id, indexCompany, indexJob)
                                }
                              >
                                Delete
                              </Button>
                            ) : (
                              <Button onClick={() => this.apply(job._id)}>
                                Apply Now
                              </Button>
                            )}
                          </div>
                        );
                      })}
                    </div>
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

const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps)(Jobs);
