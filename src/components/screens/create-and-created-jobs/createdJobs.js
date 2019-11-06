import React from "react";
import Axios from "axios";
import "./createJobs.css";
import moment from "moment";
import { Redirect } from "react-router-dom";
import { Button } from "antd";
import { jobToEdit } from "../../store/actions/jobActions";
import { connect } from "react-redux";

class CreatedJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ""
    };
  }

  async componentWillMount() {
    if (localStorage.getItem("COMPANY_TOKEN")) {
      this.setState({
        isLoading: true,
        name: "company"
      });

      const token = localStorage.getItem("COMPANY_TOKEN");
      const response = await Axios.get(
        "https://jobzillaa.herokuapp.com/api/v1/company/jobs",
        {
          headers: { "x-auth-header": token }
        }
      );

      if (response.data.jobs.length === 0) {
        this.setState({
          error: `You have'nt Created any Job.`
        });
      } else {
        this.setState({
          error: ""
        });
      }
      this.setState({
        jobs: response.data.jobs,
        isLoading: false
      });
    }
  }

  edit(index) {
    this.props.id(index);
    this.props.history.push("/create-jobs");
  }

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
      }
      return (
        <div className="jobs-company-div">
          <h1>Created Jobs</h1>
          {!this.state.error ? (
            <div className="each-company-jobs-main-div">
              {this.state.jobs.map(job => {
                return (
                  <div className="each-company-jobs-sub-div">
                    <p>
                      <span>Required Position:</span> {job.requiredPosition}
                    </p>
                    <p>
                      <span>Required Experience:</span> {job.requiredExperience}
                    </p>
                    <p>
                      <span>Job Created At:</span>{" "}
                      {moment(job.createdAt).format("LLL")}
                    </p>
                    <Button
                      style={{ width: "100%", backgroundColor: "lightBlue" }}
                      onClick={() => this.edit(job._id)}
                    >
                      EDIT
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
                padding: "5px",
                fontSize: "20px"
              }}
            >
              {this.state.error}
            </p>
          )}
        </div>
      );
    } else return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    id: id => dispatch(jobToEdit(id))
  };
};

const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps, mapDispatchToProps)(CreatedJobs);
