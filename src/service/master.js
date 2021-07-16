import Instance from './apiServiceConfig';
import { API_URL } from '../constant/actionTypes'
import { toast } from 'react-toastify';
import { ADD_INDUSTRY_SUCCESS, ADD_INDUSTRY_FAILED } from '../constant/toastMessages';

async function addIndustryType(payload) {
    try{
        const jobsData = await Instance.Instance.post(`${API_URL}jobs/panel/add-industry`, payload)
        if (jobsData && jobsData.status === 200) {
            toast.success(ADD_INDUSTRY_SUCCESS)
            return true;
        }
        else if (jobsData && jobsData.data && jobsData.data.message){
            toast.error(jobsData.data.message)
        }else{
            toast.error(ADD_INDUSTRY_FAILED)
        }
        return false;
    }catch(err){
        if (err && err.response && err.response.data && err.response.data.message){
            toast.error(err.response.data.message)
        }else{
            toast.error(ADD_INDUSTRY_FAILED)
        }
        return false;
    }
}

async function fetchIndustryType(payload) {
    const jobsData = await Instance.Instance.post(`${API_URL}jobs/panel/fetch-industry`, payload)
    if (jobsData && jobsData.status === 200) {
        return jobsData.data.data;
    }
    else if (jobsData && jobsData.data && toast.error(ADD_INDUSTRY_FAILED)){
        toast.error(toast.error(ADD_INDUSTRY_FAILED))
    }else{
        toast.error(ADD_INDUSTRY_FAILED)
    }
    return [];
}

export default {
    addIndustryType,
    fetchIndustryType
};