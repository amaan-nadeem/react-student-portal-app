

const initState = {
    authError: null
}

export const jobReducer = (state = initState, action) => {
    switch(action.type){
        case "JOB-SUCCESS":
            return {
                ...state, 
                authError: 'Job Successfully Created',
                data: action.payload
            }
        case 'JOB-FAILED':
           return  {
               authError: 'Job Failed',
                error: action.payload
            }
        case 'JOB-APPLY-SUCCESS':
           return  {
               ...state,
               authError: 'Job Application Successful',
                data: action.payload
            }
        case 'JOB-APPLY-FAILED':
           return  {
               authError: 'Job Application Failure',
                error: action.payload
            }
        case "JOB-TO-EDIT":
            return {
                authError: 'JOB-EDIT',
                data: action.payload
            }
        default: 
        return state
    }
}