import { BehaviorSubject } from 'rxjs';
import Instance from './apiServiceConfig';
import { API_URL, FILE_URL } from '../constant/actionTypes'
import { toast } from 'react-toastify';
import { ADD_JOB_SUCCESS, ADD_JOB_FAILED, UPDATE_JOB_SUCCESS, UPDATE_JOB_FAILED } from '../constant/toastMessages';
const currentUserSubject = new BehaviorSubject(localStorage.getItem('email'));
const currentUserGroup = new BehaviorSubject(localStorage.getItem('userType'));

const JobsService = {
    addJob,
    updateJob,
    fetchJobs,
    fetchJobDetails,
    fetchJobApplicants,
    fetchCompanyJobTypesIndustryTypes,
    fetchSkills,
    fetchInactiveJobs,//master
    get currentUserValue() { return currentUserSubject },
    get currentUserRole() { return currentUserGroup.value }
};

async function addJob(payload) {
    const jobsData = await Instance.Instance.post(`${API_URL}jobs/panel/add-job`, payload)
        .then(response => response)
        .catch((error) => console.trace(error));
    if (jobsData && jobsData.status === 200) {
        toast.success(ADD_JOB_SUCCESS)
    }
    else toast.error(ADD_JOB_FAILED)
    return jobsData;
}

async function updateJob(payload) {
    const jobsUpdateData = await Instance.Instance.post(`${API_URL}jobs/panel/update-job`, payload)
        .then(response => response)
        .catch((error) => console.trace(error));
    console.log("response", jobsUpdateData)
    if (jobsUpdateData && jobsUpdateData.status === 200) {
        toast.success(UPDATE_JOB_SUCCESS);
    }
    else toast.error(UPDATE_JOB_FAILED)
    return jobsUpdateData;
}

async function fetchJobs() {
    const jobsData = await Instance.Instance.post(`${API_URL}jobs/panel/get-jobs`)
        .then(response => response)
        .catch((error) => console.trace(error));
    if (jobsData && jobsData.status === 200) {
        return jobsData;
    }
    return {};
}

async function fetchInactiveJobs() {
    const jobsInactiveData = await Instance.Instance.post(`${API_URL}jobs/panel/get-inactive-jobs`)
        .then(response => response)
        .catch((error) => console.trace(error));
    if (jobsInactiveData && jobsInactiveData.status === 200) {
        return jobsInactiveData;
    }
    return {};
}

async function fetchJobDetails(payload) {
    const jobsData = await Instance.Instance.post(`${API_URL}jobs/panel/get-job-details`, payload)
        .then(response => response)
        .catch((error) => console.trace(error));
    if (jobsData && jobsData.status === 200) {
        return jobsData;
    }
    return {};

}

async function fetchJobApplicants(payload) {
    const jobsData = await Instance.Instance.post(`${API_URL}jobs/panel/get-job-applicants`, payload)
        .then(response => response)
        .catch((error) => console.trace(error));
    if (jobsData && jobsData.status === 200) {
        return jobsData;
    }
    return {};

}

async function fetchCompanyJobTypesIndustryTypes() {
    const jobTypeIndustryType = await Instance.Instance.post(`${API_URL}jobs/general/company-job-industry-type`)
        .then(response => response)
        .catch((error) => console.trace(error));
    if (jobTypeIndustryType && jobTypeIndustryType.status === 200) {
        return jobTypeIndustryType;
    }
    return {};
}

async function fetchSkills() {
    let payload = { modelKey: "skill" }
    const companyData = await Instance.Instance.post(`${API_URL}jobs/general/fetch-master`, payload)
        .then(response => response)
        .catch((error) => console.trace(error));
    if (companyData && companyData.status === 200) {
        return companyData;
    }
    return {};
}



export default JobsService;