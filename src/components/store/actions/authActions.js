import Axios from "axios";
import { actiontTypes } from "./actionsTypes";


const adminLogin = (admin) => {
    return async(dispatch, getState) => {
        try {
            const response = await Axios.post(
              "https://jobzillaa.herokuapp.com/api/v1/admin/login",
              {
                email: admin.email,
                password: admin.password,
                adminName: admin.adminName
              }
            );
            dispatch({
                type: actiontTypes.adminSuccess,
                payload: response,
                token: response.data.token
            })
          } catch (error) {
            dispatch({
                type: actiontTypes.adminFailed,
                payload: error
            })
          }
    }
};


const studentLogin = (student) => {
    return async(dispatch, getState) => {
        try {

            if(!student){
              dispatch({
                token: false,
                payload: false,
                type: actiontTypes.studentLoginFailed
              })
            }


            const response = await Axios.post(
              "https://jobzillaa.herokuapp.com/api/v1/student/login",
              {
                email: student.email,
                password: student.password
              }
            );
            dispatch({
                type: actiontTypes.studentLoginSuccess,
                payload: response,
                token: response.data.token
            })
          } catch (error) {
            dispatch({
                type: actiontTypes.studentLoginFailed,
                payload: error
            })
          }
    }
};


const companyLogin = (company) => {
    return async(dispatch, getState) => {
        try {
            const response = await Axios.post(
              "https://jobzillaa.herokuapp.com/api/v1/company/login",
              {
                email: company.email,
                password: company.password
              }
            );
            dispatch({
                type: actiontTypes.companyLoginSuccess,
                payload: response,
                token: response.data.token
            })
          } catch (error) {
            dispatch({
                type: actiontTypes.companyLoginFailed,
                payload: error
            })
          }
    }
};

const companySignup = (company) => {
    return async(dispatch, getState) => {
        try {
            const response = await Axios.post(
              "https://jobzillaa.herokuapp.com/api/v1/company/signup",
              {
                companyName: company.companyName,
                companyAddress: company.companyAddress,
                email: company.email,
                password: company.password,
                city: company.city,
                buisnessDetails: company.buisnessDetails,
                buisnessPhoneNumber: company.buisnessPhoneNumber
              }
            );
            dispatch({
                type: actiontTypes.companySignupSuccess,
                payload: response,
                token: response.data.token
            })
          } catch (error) {
            dispatch({
                type: actiontTypes.companySignupFailed,
                payload: error
            })
          }
    }
};


const studentSignup = (student) => {
    return async(dispatch, getState) => {
        try {
            const response = await Axios.post(
              "https://jobzillaa.herokuapp.com/api/v1/student/signup",
              {
                studentName: student.studentName,
                fatherName: student.fatherName,
                collegeName: student.collegeName,
                email: student.email,
                password: student.password,
                majors: student.majors,
                gender: student.gender
              }
            );
            dispatch({
                type: actiontTypes.studentSignupSuccess,
                payload: response,
                token: response.data.token
            })
          } catch (error) {
            dispatch({
                type: actiontTypes.studentSignupFailed,
                payload: error
            })
          }
    }
};


export {
    adminLogin,
    studentLogin,
    companyLogin,
    companySignup,
    studentSignup
}