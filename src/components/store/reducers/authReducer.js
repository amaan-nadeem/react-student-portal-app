import { actiontTypes } from "../actions/actionsTypes";

const initState = {
    authError: null
}


export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actiontTypes.adminSuccess:
      return {
        ...state,
        authError: "Admin Login Successfull",
        data: action.payload,
        token: action.token
      };
    case actiontTypes.adminFailed:
      return {
        state,
        authError: "Admin Login Failed",
        error: action.payload
      };
    case actiontTypes.studentLoginSuccess:
      return {
        ...state,
        authError: "Student Login Successfull",
        data: action.payload,
        token: action.token
      };
    case actiontTypes.studentLoginFailed:
      return {
        state,
        authError: "Student Login Failed",
        error: action.payload
      };
    case actiontTypes.companyLoginSuccess:
      return {
        ...state,
        authError: "Company Login Successfull",
        data: action.payload,
        token: action.token
      };
    case actiontTypes.companyLoginFailed:
      return {
        state,
        authError: "Company Login Failed",
        error: action.payload
      };
    case actiontTypes.companySignupSuccess:
      return {
        ...state,
        authError: "Company Signup Successfull",
        data: action.payload,
        token: action.token
      };
    case actiontTypes.companySignupFailed:
      return {
        state,
        authError: "Company Signup Failed",
        error: action.payload
      };
    case actiontTypes.studentSignupSuccess:
      return {
        ...state,
        authError: "Student Signup Successfull",
        data: action.payload,
        token: action.token
      };
    case actiontTypes.studentSignupFailed:
      return {
        state,
        authError: "Student Signup Failed",
        error: action.payload
      };
    case actiontTypes.Logout:
      return{
        state,
        authError: "logged-out",
        error: action.payload
      }  
    default:
      return state;
  }
};



