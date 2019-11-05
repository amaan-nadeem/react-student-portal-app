import React from "react";
import "./App.css";
import Navbar from "./components/screens/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/screens/Home";
import StudentSignup from "./components/auth/studentSignup";
import CompanySignup from "./components/auth/companySignup";
import AdminLogin from "./components/auth/adminLogin";
import StudentLogin from "./components/auth/studentLogin";
import CompanyLogin from "./components/auth/companyLogin";
import Footer from "./components/screens/Footer";
import Profile from "./components/screens/profiles/Profile";
import Companies from "./components/screens/companies/companies";
import About from "./components/screens/About";
import Dashboard from "./components/screens/dashboards/Dashboard";
import Students from "./components/screens/jobs-and-students/Students";
import Jobs from "./components/screens/jobs-and-students/jobs";
import CreateJob from "./components/screens/create-and-created-jobs/CreateJobs";
import CreatedJobs from "./components/screens/create-and-created-jobs/createdJobs";
import ApplyForJobs from "./components/screens/create-and-created-jobs/apply-job/ApplyForJob";
import JobApplications from "./components/screens/jobs-and-students/jobApplications";
import AppliedJobs from "./components/screens/create-and-created-jobs/apply-job/appliedJobs";

class App extends React.Component {
  componentWillMount() {
    if (localStorage.getItem("COMPANY_TOKEN")) {
      this.setState({
        name: "no-footer-needed"
      });
    } else if (localStorage.getItem("STUDENT_TOKEN")) {
      this.setState({
        name: "no-footer-needed"
      });
    } else if (localStorage.getItem("ADMIN_TOKEN")) {
      this.setState({
        name: "no-footer-needed"
      });
    } else {
      this.setState({
        name: "footer"
      });
    }
  }
  render() {
    return (
      <React.Fragment>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/student-signup" component={StudentSignup} />
            <Route path="/company-signup" component={CompanySignup} />
            <Route path="/admin-login" exact component={AdminLogin} />
            <Route path="/company-login" component={CompanyLogin} />
            <Route path="/student-login" component={StudentLogin} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/companies" component={Companies} />
            <Route path="/jobs" component={Jobs} />
            <Route path="/students" component={Students} />
            <Route path="/about" component={About} />
            <Route path="/profile" component={Profile} />
            <Route path="/create-jobs" component={CreateJob} />
            <Route path="/created-jobs" component={CreatedJobs} />
            <Route path="/apply-jobs" component={ApplyForJobs} />
            <Route path="/job-applications" component={JobApplications} />
            <Route path="/applied-jobs" component={AppliedJobs} />
          </Switch>
          {this.state.name !== "no-footer-needed" ? <Footer /> : <></>}
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
