import Axios from "axios"


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
                type: 'ADMIN_LOGIN_SUCCESS',
                payload: response,
                token: response.data.token
            })
          } catch (error) {
            dispatch({
                type: 'ADMIN_LOGIN_ERROR',
                payload: error
            })
          }
    }
};


const studentLogin = (student) => {
    return async(dispatch, getState) => {
        try {
            const response = await Axios.post(
              "https://jobzillaa.herokuapp.com/api/v1/student/login",
              {
                email: student.email,
                password: student.password
              }
            );
            dispatch({
                type: 'STUDENT_LOGIN_SUCCESS',
                payload: response,
                token: response.data.token
            })
          } catch (error) {
            dispatch({
                type: 'STUDENT_LOGIN_ERROR',
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
                type: 'COMPANY_LOGIN_SUCCESS',
                payload: response,
                token: response.data.token
            })
          } catch (error) {
            dispatch({
                type: 'COMPANY_LOGIN_ERROR',
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
                type: 'COMPANY_SIGNUP_SUCCESS',
                payload: response,
                token: response.data.token
            })
          } catch (error) {
            dispatch({
                type: 'COMPANY_SIGNUP_ERROR',
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
                type: 'STUDENT_SIGNUP_SUCCESS',
                payload: response,
                token: response.data.token
            })
          } catch (error) {
            dispatch({
                type: 'STUDENT_SIGNUP_ERROR',
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