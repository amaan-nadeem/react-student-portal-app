const initState = {
    authError: null
}


export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADMIN_LOGIN_SUCCESS":
      return {
        ...state,
        authError: "Admin Login Successfull",
        data: action.payload,
        token: action.token
      };
    case "ADMIN_LOGIN_ERROR":
      return {
        state,
        authError: "Admin Login Failed",
        error: action.payload
      };
    case "STUDENT_LOGIN_SUCCESS":
      return {
        ...state,
        authError: "Student Login Successfull",
        data: action.payload,
        token: action.token
      };
    case "STUDENT_LOGIN_ERROR":
      return {
        state,
        authError: "Student Login Failed",
        error: action.payload
      };
    case "COMPANY_LOGIN_SUCCESS":
      return {
        ...state,
        authError: "Company Login Successfull",
        data: action.payload,
        token: action.token
      };
    case "COMPANY_LOGIN_ERROR":
      return {
        state,
        authError: "Company Login Failed",
        error: action.payload
      };
    case "COMPANY_SIGNUP_SUCCESS":
      return {
        ...state,
        authError: "Company Signup Successfull",
        data: action.payload,
        token: action.token
      };
    case "COMPANY_SIGNUP_ERROR":
      return {
        state,
        authError: "Company Signup Failed",
        error: action.payload
      };
    case "STUDENT_SIGNUP_SUCCESS":
      return {
        ...state,
        authError: "Student Signup Successfull",
        data: action.payload,
        token: action.token
      };
    case "STUDENT_SIGNUP_ERROR":
      return {
        state,
        authError: "Student Signup Failed",
        error: action.payload
      };
    case "LOGOUT_SUCCESS":
      return{
        state,
        authError: "logged-out",
        error: action.payload
      }  
    default:
      return state;
  }
};



