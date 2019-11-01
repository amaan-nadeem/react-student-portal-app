import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "../createJobs.css";
import { applyForJob } from "../../../store/actions/jobActions";


class ApplyForJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalExperience: "",
      experienceInSpecifiedField: "",
      error: ""
    };
  }

  onSubmit = async e => {
    e.preventDefault();

    
    if (this.state.totalExperience.length === 0) {
      return this.setState({
        error: "Total Experience Field is not allowed to be empty"
      });
    } else if (this.state.experienceInSpecifiedField.length === 0) {
      return this.setState({
        error: "Experience in Specified Field field is not allowed to be empty"
      });
    }
    console.log(localStorage.getItem("JOB-ID"))
    const job = {
      totalExperience: this.state.totalExperience,
      experienceInSpecifiedField: this.state.experienceInSpecifiedField,
      token: localStorage.getItem('STUDENT_TOKEN'),
      id: localStorage.getItem("JOB-ID")
    }

    await this.props.job(job)

    if(this.props.state.authError === "Job Application Successful"){
      this.setState({
        error: "Job posted Successfully!"
      })
    }
    else if(this.props.state.authError === "Job Application Failure"){
      console.log(this.props.state.job.error.response.data.message);
    }
    console.log(this.props);
   
  };

  componentWillMount(){
    if(localStorage.getItem('STUDENT_TOKEN')){
      this.setState({
        name: 'student'
      })
    }
  }
  
  render() {
    if (this.state.name === 'student') {
      return (
        <div className="job-div">
          <h1>Apply For A Job</h1>
          <Form className="job-form" onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="totalWorkingExperience">Total Working Experience</Label>
              <Input
                type="text"
                name="text"
                id="totalWorkingExperience"
                placeholder="Enter the total working experience"
                onChange={e =>
                  this.setState({ totalExperience: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="experienceInRequiredField">Experience In Required Field</Label>
              <Input
                type="text"
                name="text"
                id="experienceInRequiredField"
                placeholder="Enter your experience in Specified Field"
                onChange={e =>
                  this.setState({ experienceInSpecifiedField: e.target.value })
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
    job: job => dispatch(applyForJob(job))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplyForJobs);
