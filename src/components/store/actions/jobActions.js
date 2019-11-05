import Axios from 'axios';
import { actiontTypes } from './actionsTypes';


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
                type: actiontTypes.jobSuccess,
                payload: response
            })
        } catch (error) {
            dispatch({
                type: actiontTypes.jobFailed,
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
                type: actiontTypes.jobApplySuccess,
                payload: response
            })
        } catch (error) {
            dispatch({
                type: actiontTypes.jobApplyFailed,
                payload: error
            })
        }
    }
}

export const jobToEdit = (id) => {
    return async (dispatch, getState) => {
            dispatch({
                type: 'JOB-TO-EDIT',
                payload: id
            })
    }
}