import React from "react";
import { Button } from "reactstrap";
import "../companies/companies.css";
import Axios from "axios";
import { Redirect } from "react-router-dom";

class Students extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: []
    };
  }

  async componentWillMount() {
    if (localStorage.getItem("COMPANY_TOKEN")) {
     this.setState({
       name: 'company'
     })
    } else if (localStorage.getItem("ADMIN_TOKEN")) {
      // loading screen
      this.setState({
        isLoading: true,
        name: "admin"
      });
      // getting response back
      const token = localStorage.getItem("ADMIN_TOKEN");
      const response = await Axios.get(
        "https://jobzillaa.herokuapp.com/api/v1/admin/students",
        {
          headers: { "x-auth-header": token }
        }
      );

      this.setState({
        isLoading: false,
        name: "admin",
        students: response.data.students
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

  Delete = async (i, index) => {
   
     if(localStorage.getItem('ADMIN_TOKEN')){
        // getting response back
      const token = localStorage.getItem("ADMIN_TOKEN");
          await Axios.delete(`https://jobzillaa.herokuapp.com/api/v1/admin/delete-student/${i}`,{
                headers: {'x-auth-header': token}
            });
        }

    const studentToDelete = this.state.students[index];
    const students = this.state.students.filter((student) => {
        return student !== studentToDelete
    })

    this.setState({
      students
    })
  }

  render() {
   
    if (this.state.name === "admin") {
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
            <h2>Students Data</h2>
            <div className="each-companies">
              {this.state.students.map((student, index) => {
                return (
                  <div className={`company-${index} sub-companies`}>
                    <h1>{student.studentName.toUpperCase()}</h1>
                    <p>
                      <span>Father Name: </span>
                      {student.fatherName}
                    </p>
                    <p>
                      <span>Email: </span>
                      {student.email}
                    </p>
                    <p>
                      <span>College Name: </span>
                      {student.collegeName}
                    </p>
                    <p><span>Majors: </span>
                        {student.majors.map((major, index) => {
                            return <em>{major}</em> 
                        })}
                    </p>
                 <Button onClick={() => this.Delete(student._id, index)}>Delete</Button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
    } else return <Redirect to="/" />
}
}
export default Students;
