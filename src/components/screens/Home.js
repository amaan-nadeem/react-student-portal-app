import React from "react";
import { Jumbotron, Container, Button } from "reactstrap";
import "./styles/Home.css";
import { Redirect, Link } from "react-router-dom";
import CountUp from "react-countup";
import Fade from "react-reveal/Fade";

class Home extends React.Component {
  componentWillMount() {
    if (localStorage.getItem("COMPANY_TOKEN")) {
      this.setState({
        name: "company"
      });
    } else if (localStorage.getItem("STUDENT_TOKEN")) {
      this.setState({
        name: "student"
      });
    } else if (localStorage.getItem("ADMIN_TOKEN")) {
      this.setState({
        name: "admin"
      });
    } else {
      this.setState({
        name: ""
      });
    }
  }

  render() {
    if (!this.state.name) {
      return (
        <div>
          <Jumbotron className="jumbotron-header" fluid>
            <Container className="container-header" fluid>
              <h1 className="display-3">HELLO.</h1>
              <p className="lead">
                We help match companies with grabbing talented college Students
              </p>
            </Container>
          </Jumbotron>
          <section className="section-description">
            <div className="description">
              <Fade>
              <h2>
                MATCHING COMPANIES WITH TALENTED{" "}
                <span style={{ display: "block" }}>
                  {" "}
                  STUDENTS AND GRADUATES{" "}
                </span>
              </h2>
              <div>_________________________</div>
              <p>
                JobZilla is a Recruitment and Employment Agency, specialising in
                Student Internships, <b>Student</b> Placements and Jobs. We help
                connect students with start-up businesses, SME’s and large
                corporations.
              </p>
              <p>
                With over 20 years of dedicated experience, we have formed
                exceptional working relationships with our clients,{" "}
                <b>students</b> and all the <b>colleges</b> across the board. We
                pride ourselves on our dedication to provide excellent services
                to all our users, continuously meeting their needs and striving
                to develop what we offer.
              </p>
              </Fade>
              <div className="row">
                <div className="column col-5">
                  <Button>
                    <i class="fas fa-users"></i>
                  </Button>
                  <CountUp
                    start={0}
                    end={1500}
                    duration={5}
                    className="counter"
                  />
                  <h3 className="section-heading">Student Registered</h3>
                </div>
                <div className="column col-5">
                  <Button>
                    <i class="fas fa-building"></i>
                  </Button>
                  <CountUp
                    start={0}
                    end={100}
                    duration={5}
                    className="counter"
                  />
                  <h3 className="section-heading">Companies registered</h3>
                </div>
              </div>
            </div>
          </section>
          <section className="section-recruit">
            <Jumbotron className="jumbotron-recruit" fluid>
              <Fade>
              <Container className="container-recruit" fluid>
                <h3 className="display-3">
                  IS YOUR BUSINESS LOOKING TO RECRUIT <br /> A SUPER INTERN?
                </h3>
                <p className="lead">
                  Whether your company is a new start-up business, SME or a
                  large corporation,
                  <br /> JobZilla will take all the hassle out of hiring by
                  helping find and connecting you <br /> with the perfect
                  <b> student</b> or <b>graduate</b> from a rich pool of talent.
                </p>
                <Button className="button-recruit">
                  <Link
                    to="/company-signup"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    RECRUIT AN INTERN
                  </Link>
                </Button>
              </Container>
              </Fade>
            </Jumbotron>
          </section>
        </div>
      );
    } else return <Redirect to="/dashboard" />;
  }
}
export default Home;
