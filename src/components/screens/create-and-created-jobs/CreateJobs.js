import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./createJobs.css";
import { createJob, jobToEdit } from "../../store/actions/jobActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Axios from "axios";

class CreateJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requiredPosition: "",
      requiredExperience: "",
      error: ""
    };
  }

  onSubmit = async e => {
    e.preventDefault();

    if (this.state.requiredPosition.length === 0) {
      return this.setState({
        error: "Required Position is not allowed to be empty"
      });
    } else if (this.state.requiredExperience.length === 0) {
      return this.setState({
        error: "Required Experience is not allowed to be empty"
      });
    }

    const job = {
      requiredPosition: this.state.requiredPosition,
      requiredExperience: this.state.requiredExperience,
      token: localStorage.getItem("COMPANY_TOKEN")
    };

    await this.props.job(job);

    if (this.props.state.job.authError === "Job Successfully Created") {
      localStorage.setItem("SUCCESS", "success");
      this.props.history.push("/created-jobs");
    } else if (this.props.state.job.authError === "Job Failed") {
      this.setState({
        error: "Please check your Internet Connection"
      });
    }
  };

  edit = async e => {
    e.preventDefault();
    const id = this.props.state.job.data;
    const token = localStorage.getItem("COMPANY_TOKEN");
    if (
      !this.state.requiredPosition &&
      this.state.requiredExperience.length >= 1
    ) {
      await Axios.put(
        `https://jobzillaa.herokuapp.com/api/v1/jobs/edit-job/${id}`,
        {
          requiredExperience: this.state.requiredExperience
        },
        {
          headers: { "x-auth-header": token }
        }
      );

      this.setState({
        error: "Job Updated"
      });
      // directing the user to created jobs url
      setTimeout(() => {
        this.props.history.push("/created-jobs");
      }, 500);
    } else if (
      !this.state.requiredExperience &&
      this.state.requiredPosition.length >= 1
    ) {
      await Axios.put(
        `https://jobzillaa.herokuapp.com/api/v1/jobs/edit-job/${id}`,
        {
          requiredPosition: this.state.requiredPosition
        },
        {
          headers: { "x-auth-header": token }
        }
      );

      this.setState({
        error: "Job Updated"
      });
      // directing the user to created jobs url
      setTimeout(() => {
        this.props.history.push("/created-jobs");
      }, 500);
    } else if (this.state.requiredExperience && this.state.requiredPosition) {
      await Axios.put(
        `https://jobzillaa.herokuapp.com/api/v1/jobs/edit-job/${id}`,
        {
          requiredExperience: this.state.requiredExperience,
          requiredPosition: this.state.requiredPosition
        },
        {
          headers: { "x-auth-header": token }
        }
      );

      this.setState({
        error: "Job Updated"
      });
      // directing the user to created jobs url
      setTimeout(() => {
        this.props.history.push("/created-jobs");
      }, 500);
    } else {
      this.setState({
        error: "Field are empty nothing to be updated"
      });
    }
  };

  componentWillMount() {
    console.log(this.props);
    this.setState({
      jobToEdit: this.props.state.job.data
    });

    if (localStorage.getItem("COMPANY_TOKEN")) {
      this.setState({
        name: "company"
      });
    }
  }

  componentWillUnmount() {
    this.props.id(false);
    this.setState({
      jobToEdit: false
    });
  }

  render() {
    if(this.props.state.auth.authError === "logged-out"){
      return <Redirect to = "/" />
    }
    if (this.state.name === "company") {
      return (
        <div className="job-div">
          <h1>Create A Job</h1>
          <Form
            className="job-form"
            onSubmit={!this.state.jobToEdit ? this.onSubmit : this.edit}
          >
            <FormGroup>
              <Label for="requiredPostion">Required Position</Label>
              <Input
                type="text"
                name="text"
                id="requiredPosition"
                placeholder="Enter the job position"
                onChange={e =>
                  this.setState({ requiredPosition: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Required Experience</Label>
              <Input
                type="text"
                name="text"
                id="examplePassword"
                placeholder="Enter the required experience for the eligibility of job"
                onChange={e =>
                  this.setState({ requiredExperience: e.target.value })
                }
              />
            </FormGroup>
            {!this.state.jobToEdit ? (
              <Button>Submit</Button>
            ) : (
              <Button>Edit</Button>
            )}
            <p
              style={{ color: "red", textAlign: "center", paddingTop: "10px" }}
            >
              {this.state.error}
            </p>
          </Form>
        </div>
      );
    } else return <Redirect to="/" />;
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    job: job => dispatch(createJob(job)),
    id: id => dispatch(jobToEdit(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateJob);
