import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import "./styles.css/formStyles.css";
import jwt_decode from 'jwt-decode';
import {connect} from 'react-redux';
import { studentLogin } from '../store/actions/authActions';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom'; 

class NormalLoginForm extends React.Component {
  state = {
    error: '',
    token: '',
    name: ''
  }
  handleSubmit = async e => {
    e.preventDefault();
    await this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // front end error checking
        console.log("Received values of form: ", values);

        // logging student in
        const student = {
          email: values.email,
          password: values.password
        };
        await this.props.student(student);

        // saving and fetching the token from local storage
        if (this.props.state.auth.authError === "Student Login Successfull") {
          // storing jwt token
          localStorage.setItem(
            "STUDENT_TOKEN",
            this.props.state.auth.data.data.token
          );
          const decoded = jwt_decode(
            this.props.state.auth.data.data.token
          );
         
           // login company in 
           this.props.history.push('/dashboard');
        }

        // displaying backend error to user
        if (this.props.state.auth.authError === "Student Login Failed") {
          if(this.props.state.auth.error.response){
            this.setState({
              error: this.props.state.auth.error.response.data.message
            });
          }
          else this.setState({
            error: 'Please check your Internet Connection'
          })
        }
      }
    });
  };

  componentWillMount(){
    if(localStorage.getItem("COMPANY_TOKEN")){
      const decoded = jwt_decode(localStorage.getItem("COMPANY_TOKEN"))
      this.setState({
          token: decoded.company._id,
          name: 'dashboard'
      })
    }
    else if(localStorage.getItem("STUDENT_TOKEN")){
      const decoded = jwt_decode(localStorage.getItem("STUDENT_TOKEN"))
      this.setState({
          token: decoded.student._id,
          name: 'dashboard'
      })
    }
    else if(localStorage.getItem("ADMIN_TOKEN")){
      const decoded = jwt_decode(localStorage.getItem("ADMIN_TOKEN"))
      this.setState({
          token: decoded.admin._id,
          name: 'dashboard'
      })
    } 
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    if(this.state.token){
      return <Redirect to ={`/${this.state.name}`} />
    } 
    
    if(this.props.state.auth.token){
      return <Redirect to='/dashboard'/>
    }


    return (
        <div className="login-form">
            <h1>Student Login</h1>
      <Form onSubmit={this.handleSubmit} className="login-form">
      <Form.Item>
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="email"
              />
            )}
          </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" style={{display:'block', width: '100%'}} htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to="/student-signup">register now!</Link>
          <p style={{color: 'red'}}>{this.state.error}</p>
        </Form.Item>
      </Form>
      </div>
    );
  }
}

const StudentLogin = Form.create({ name: 'normal_login' })(NormalLoginForm);

const mapStateToProps = (state) => {
  return {
    state
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    student: student => dispatch(studentLogin(student)) 
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(StudentLogin)