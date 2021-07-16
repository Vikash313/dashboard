import { BehaviorSubject } from 'rxjs';
import Instance from './apiServiceConfig';
import { API_URL, FILE_URL } from '../constant/actionTypes'
const currentUserSubject = new BehaviorSubject(localStorage.getItem('email'));
const currentUserGroup = new BehaviorSubject(localStorage.getItem('userType'));

const locationService = {
    fetchCountries,
    fetchStates,
    fetchCities,
    get currentUserValue() { return currentUserSubject },
    get currentUserRole() { return currentUserGroup.value }
};

async function fetchCountries() {
    const jobsCountry = await Instance.Instance.post(`${API_URL}jobs/general/country`)
        .then(response => response)
        .catch((error) => console.trace(error));
    if (jobsCountry && jobsCountry.status === 200) {
        console.log("success data for country");
    }
    return jobsCountry;
}

async function fetchStates(id) {
    let payload = { countryId: id }
    const jobsState = await Instance.Instance.post(`${API_URL}jobs/general/state`, payload)
        .then(response => response)
        .catch((error) => console.trace(error));
    if (jobsState && jobsState.status === 200) {
        console.log("success data for states");
    }
    return jobsState;
}

async function fetchCities(id) {
    let payload = { stateId: id }
    const jobsCities = await Instance.Instance.post(`${API_URL}jobs/general/city`, payload)
        .then(response => response)
        .catch((error) => console.trace(error));
    if (jobsCities && jobsCities.status === 200) {
        console.log("success data for cities");
    }
    return jobsCities;
}

export default locationService;