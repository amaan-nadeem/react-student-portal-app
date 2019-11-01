import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./createJobs.css";
import { createJob } from "../../store/actions/jobActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";


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
      this.props.history.push('/created-jobs');
    }
  };

  componentWillMount() {
   
    if (localStorage.getItem("COMPANY_TOKEN")) {
      this.setState({
        name: "company"
      });
    }
  }
  render() {
    if (this.state.name === 'company') {
      return (
        <div className="job-div">
          <h1>Create A Job</h1>
          <Form className="job-form" onSubmit={this.onSubmit}>
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
            <Button>Submit</Button>
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
    job: job => dispatch(createJob(job))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateJob);
