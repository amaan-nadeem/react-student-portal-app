import Axios from 'axios';

export const createJob = (job) => {
    return async (dispatch, getState) => {
        try {
            const response = await Axios.post('https://jobzillaa.herokuapp.com/api/v1/jobs/create-jobs',{
                requiredPosition: job.requiredPosition,
                requiredExperience: job.requiredExperience
            }, {
                headers: {'x-auth-header': job.token}
            })

            dispatch({
                type: 'JOB-SUCCESS',
                payload: response
            })
        } catch (error) {
            dispatch({
                type: 'JOB-FAILED',
                payload: error
            })
        }
    }
}


export const applyForJob = (job) => {
    return async (dispatch, getState) => {
        try {
            const response = await Axios.post(`https://jobzillaa.herokuapp.com/api/v1/jobs/apply-for-job/${job.id}`,{
                totalExperience: job.totalExperience,
                experienceInSpecifiedField: job.experienceInSpecifiedField
            }, {
                headers: {'x-auth-header': job.token}
            })

            dispatch({
                type: 'JOB-APPLY-SUCCESS',
                payload: response
            })
        } catch (error) {
            dispatch({
                type: 'JOB-APPLY-FAILED',
                payload: error
            })
        }
    }
}