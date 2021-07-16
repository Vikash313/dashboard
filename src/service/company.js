import Instance from './apiServiceConfig';
import { API_URL, FILE_URL } from '../constant/actionTypes';
import { toast } from 'react-toastify';
import { ADD_COMPANY_SUCCESS, ADD_COMPANY_FAILED, UPDATE_COMPANY_SUCCESS, UPDATE_COMPANY_FAILED } from '../constant/toastMessages';
const companyService = {
    addJobCompany,
    fetchJobCompanies,
    fetchJobCompanyDetails,
    updateJobCompany,
    fetchCompanies,
    fetchInactiveJobCompanies,//master
};

async function addJobCompany(payload) {
    const addJobCompanyVar = await Instance.MultipartInstance.post(`${API_URL}jobs/panel/add-job-company`, payload)
        .then(response => response)
        .catch((error) => console.trace(error));
    if (addJobCompanyVar && addJobCompanyVar.status === 200) {
        toast.success(ADD_COMPANY_SUCCESS)
    }
    else toast.error(ADD_COMPANY_FAILED)
    return addJobCompanyVar;
}

async function updateJobCompany(payload) {
    const jobsUpdateData = await Instance.Instance.post(`${API_URL}jobs/panel/update-job-company`, payload)
        .then(response => response)
        .catch((error) => console.trace(error));
    console.log("response", jobsUpdateData)
    if (jobsUpdateData && jobsUpdateData.status === 200) {
        toast.success(UPDATE_COMPANY_SUCCESS);
    }
    else toast.error(UPDATE_COMPANY_FAILED)
    return jobsUpdateData;
}

async function fetchJobCompanies() {
    const fetchedCompanies = await Instance.Instance.post(`${API_URL}jobs/panel/get-job-company`)
        .then(response => response)
        .catch((error) => console.trace(error));
    if (fetchedCompanies && fetchedCompanies.status === 200) {
        return fetchedCompanies;
    }
    return [];
}

async function fetchInactiveJobCompanies() {
    const fetchedInactiveCompanies = await Instance.Instance.post(`${API_URL}jobs/panel/get-inactive-job-company`)
        .then(response => response)
        .catch((error) => console.trace(error));
    if (fetchedInactiveCompanies && fetchedInactiveCompanies.status === 200) {
        return fetchedInactiveCompanies;
    }
    return [];
}

async function fetchJobCompanyDetails(payload) {
    const fetchCompanyDetails = await Instance.Instance.post(`${API_URL}jobs/panel/get-job-company-details`, payload)
        .then(response => response)
        .catch((error) => console.trace(error));
    if (fetchCompanyDetails && fetchCompanyDetails.status === 200) {
        return fetchCompanyDetails;
    }
    return [];
}

async function fetchCompanies() {
    let payload = { modelKey: "company" }
    const companyData = await Instance.Instance.post(`${API_URL}jobs/general/fetch-master`, payload)
        .then(response => response)
        .catch((error) => console.trace(error));
    if (companyData && companyData.status === 200) {
        return companyData;
    }
    return {};
}

export default companyService;