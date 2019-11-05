import React from "react";
import "antd/dist/antd.css";
import "./styles.css/formStyles.css";
import { connect } from "react-redux";
import { Form, Input, Select, Checkbox, Button, AutoComplete } from "antd";
import { companySignup } from "../store/actions/authActions";
import jwt_decode from "jwt-decode";
import {Redirect} from 'react-router-dom';
const { Option } = Select;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    token: '',
    cities: [
      "Ahmadpur East",
      "Ahmed Nager Chatha",
      "Ali Khan Abad",
      "Alipur",
      "Arifwala",
      "Attock",
      "Bhera",
      "Bhalwal",
      "Bahawalnagar",
      "Bahawalpur",
      "Bhakkar",
      "Burewala",
      "Chenab Nagar",
      "Chillianwala",
      "Choa Saidanshah",
      "Chakwal",
      "Chak Jhumra",
      "Chichawatni",
      "Chiniot",
      "Chishtian",
      "Chunian",
      "Dajkot",
      "Daska",
      "Davispur",
      "Darya Khan",
      "Dera Ghazi Khan",
      "Dhaular",
      "Dina",
      "Dinga",
      "Dhudial Chakwal",
      "Dipalpur",
      "Faisalabad",
      "Fateh Jang",
      "Ghakhar Mandi",
      "Gojra",
      "Gujranwala",
      "Gujrat",
      "Gujar Khan",
      "Harappa",
      "Hafizabad",
      "Haroonabad",
      "Hasilpur",
      "Haveli Lakha",
      "Jalalpur Jattan",
      "Jampur",
      "Jaranwala",
      "Jhang",
      "Jhelum",
      "Kallar Syedan",
      "Kalabagh",
      "Karor Lal Esan",
      "Kasur",
      "Kamalia",
      "Kāmoke",
      "Karachi",
      "Khanewal",
      "Khanpur",
      "Khanqah Sharif",
      "Kharian",
      "Khushab",
      "Kot Adu",
      "Jauharabad",
      "Lahore",
      "Islamabad",
      "Lalamusa",
      "Layyah",
      "Lawa Chakwal",
      "Liaquat Pur",
      "Lodhran",
      "Malakwal",
      "Mamoori",
      "Mailsi",
      "Mandi Bahauddin",
      "Mian Channu",
      "Mianwali",
      "Miani",
      "Multan",
      "Murree",
      "Muridke",
      "Mianwali Bangla",
      "Muzaffargarh",
      "Narowal",
      "Nankana Sahib",
      "Okara",
      "Renala Khurd",
      "Pakpattan",
      "Pattoki",
      "Pindi Bhattian",
      "Pind Dadan Khan",
      "Pir Mahal",
      "Qaimpur",
      "Qila Didar Singh",
      "Raiwind",
      "Rajanpur",
      "Rahim Yar Khan",
      "Rawalpindi",
      "Sadiqabad",
      "Sagri",
      "Sahiwal",
      "Sambrial",
      "Samundri",
      "Sangla Hill",
      "Sarai Alamgir",
      "Sargodha",
      "Shakargarh",
      "Sheikhupura",
      "Shujaabad",
      "Sialkot",
      "Sohawa",
      "Soianwala",
      "Siranwali",
      "Tandlianwala",
      "Talagang",
      "Taxila",
      "Toba Tek Singh",
      "Vehari",
      "Wah Cantonment",
      "Wazirabad",
      "Yazman",
      "Zafarwal"
    ]
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        const buisnessPhoneNumber = parseInt(values.buisnessPhoneNumber);
        if (!buisnessPhoneNumber) {
          this.setState({
            error: "Alphabets are not allowed as a phone number"
          });
        } else {
          values.buisnessPhoneNumber = buisnessPhoneNumber;
          // signing company in
          const company = {
            email: values.email,
            password: values.password,
            companyName: values.companyName,
            companyAddress: values.companyAddress,
            city: values.city,
            buisnessDetails: values.buisnessDetails,
            buisnessPhoneNumber: values.buisnessPhoneNumber
          };

          await this.props.company(company);

          // saving and fetching the token from local storage
          if (
            this.props.state.auth.authError === "Company Signup Successfull"
          ) {
            // storing jwt token
            localStorage.setItem(
              "COMPANY_TOKEN",
              this.props.state.auth.data.data.token
            );
            const decoded = jwt_decode(this.props.state.auth.data.data.token);
            this.setState({
              redirect: true
            });

            window.location.reload();
          }

          // displaying backend error to user
          if (this.props.state.auth.authError === "Company Signup Failed") {
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

  render() {
    const { getFieldDecorator } = this.props.form;

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

    if(this.state.token){
      return <Redirect to ={`/${this.state.name}`} />
    } 

    return (
      <div className="form">
        <h1>Company Registration Form</h1>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="Company Name">
            {getFieldDecorator("companyName", {
              rules: [
                { required: true, message: "Please input your company name" }
              ]
            })(
              <AutoComplete placeholder="company name">
                <Input />
              </AutoComplete>
            )}
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
          <Form.Item label="Buisness Details">
            {getFieldDecorator("buisnessDetails", {
              rules: [
                {
                  required: true,
                  message: "Please input your buisness details"
                }
              ]
            })(
              <AutoComplete placeholder="buisness details">
                <Input />
              </AutoComplete>
            )}
          </Form.Item>

          <Form.Item label="Buisness Address">
            {getFieldDecorator("companyAddress", {
              rules: [
                {
                  required: true,
                  message: "Please input your buisness address"
                }
              ]
            })(
              <AutoComplete placeholder="buisness address">
                <Input />
              </AutoComplete>
            )}
          </Form.Item>

          <Form.Item label="Select" hasFeedback>
            {getFieldDecorator("city", {
              rules: [
                { required: true, message: "Please select your city!" }
              ]
            })(
              <Select placeholder="Please select a city">
                {this.state.cities.map((city, index) => {
                  return  <Option value={city}>{city}</Option>
                })}
              </Select>,
            )}
          </Form.Item>

          <Form.Item label="Company Phone Number">
            {getFieldDecorator("buisnessPhoneNumber", {
              rules: [
                { required: true, message: "Please input your phone number!" }
              ]
            })(<Input style={{ width: "100%" }} />)}
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

const CompanySignup = Form.create({ name: "register" })(RegistrationForm);
const mapDispatchToProps = dispatch => {
  return { company: company => dispatch(companySignup(company)) };
};

const mapStateToProps = state => {
  return {
    state
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanySignup);
