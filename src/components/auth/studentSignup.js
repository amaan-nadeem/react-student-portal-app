import React from "react";
import "antd/dist/antd.css";
import "./styles.css/formStyles.css";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete
} from "antd";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { studentSignup } from "../store/actions/authActions";
import { Redirect } from "react-router-dom";
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const majors = [
  {
    value: "Science",
    label: "Science"
  },
  {
    value: "Commerce",
    label: "Commerce"
  },
  {
    value: "Arts",
    label: "Arts"
  },
  {
    value: "other",
    label: "other"
  }
];
const gender = [
  {
    value: "male",
    label: "male"
  },
  {
    value: "female",
    label: "female"
  }
];

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    error: '',
    token: ''
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
       

        // loging admin in
        const student = {
          email: values.email,
          password: values.password,
          studentName: values.studentName,
          collegeName: values.collegeName,
          fatherName: values.fatherName,
          majors: values.major,
          gender: values.gender[0]
        };

        await this.props.student(student);

        // saving and fetching the token from local storage
        if (this.props.state.auth.authError === "Student Signup Successfull") {
          // storing jwt token
          localStorage.setItem(
            "STUDENT_TOKEN",
            this.props.state.auth.data.data.token
          );

          this.setState({
            redirect: true
          });

         this.props.history.push('/dashboard');
        }

        // displaying backend error to user
        if (this.props.state.auth.authError === "Student Signup Failed") {
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


  componentWillMount() {
    if (localStorage.getItem("COMPANY_TOKEN")) {
      const decoded = jwt_decode(localStorage.getItem("COMPANY_TOKEN"));
      this.setState({
        token: decoded.company._id,
        name: "dashboard"
      });
    } else if (localStorage.getItem("STUDENT_TOKEN")) {
      const decoded = jwt_decode(localStorage.getItem("STUDENT_TOKEN"));
      this.setState({
        token: decoded.student._id,
        name: "dashboard"
      });
    } else if (localStorage.getItem("ADMIN_TOKEN")) {
      const decoded = jwt_decode(localStorage.getItem("ADMIN_TOKEN"));
      this.setState({
        token: decoded.admin._id,
        name: "dashboard"
      });
    } 
  }

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    if (this.state.token) {
      return <Redirect to={`/${this.state.name}`} />;
    }
    
    if(this.props.state.auth.token){
      return <Redirect to='/dashboard'/>
    }


    return (
      <div className="form">
        <h1>Student Registration Form</h1>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="Student Name">
            {getFieldDecorator("studentName", {
              rules: [{ required: true, message: "Please input your name" }]
            })(
              <AutoComplete
                dataSource={websiteOptions}
                onChange={this.handleWebsiteChange}
                placeholder="student name"
              >
                <Input />
              </AutoComplete>
            )}
          </Form.Item>

          <Form.Item label="Father Name">
            {getFieldDecorator("fatherName", {
              rules: [
                { required: true, message: "Please input your Father Name" }
              ]
            })(
              <AutoComplete
                dataSource={websiteOptions}
                onChange={this.handleWebsiteChange}
                placeholder="father name"
              >
                <Input />
              </AutoComplete>
            )}
          </Form.Item>
          <Form.Item label="College Name">
            {getFieldDecorator("collegeName", {
              rules: [
                { required: true, message: "Please input your college name" }
              ]
            })(
              <AutoComplete
                dataSource={websiteOptions}
                onChange={this.handleWebsiteChange}
                placeholder="college name"
              >
                <Input />
              </AutoComplete>
            )}
          </Form.Item>
          <Form.Item label="major">
            {getFieldDecorator("major", {
              initialValue: ["none"],
              rules: [
                {
                  type: "array",
                  required: true,
                  message: "Please select your major subject"
                }
              ]
            })(<Cascader options={majors} />)}
          </Form.Item>
          <Form.Item label="gender">
            {getFieldDecorator("gender", {
              initialValue: ["none"],
              rules: [
                {
                  type: "array",
                  required: true,
                  message: "Please select your gender"
                }
              ]
            })(<Cascader options={gender} />)}
          </Form.Item>

          <Form.Item label="E-mail">
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
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
          <p className="error" style={{ color: "red", marginLeft: "20vw" }}>
            {this.state.error}
          </p>
        </Form>
      </div>
    );
  }
}

const StudentSignup = Form.create({ name: "register" })(RegistrationForm);
const mapStateToProps = state => {
  return {
    state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    student: student => dispatch(studentSignup(student))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentSignup);
