import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import { API_URL, FILE_URL } from '../constant/actionTypes'
const currentUserSubject = new BehaviorSubject(localStorage.getItem('email'));
const currentUserGroup = new BehaviorSubject(localStorage.getItem('userType'));

const AuthenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject },
    get currentUserRole() { return currentUserGroup.value }
};

export default AuthenticationService;

async function login({ email, password }) {
    const loginData = await axios.post(`${API_URL}jobs/auth/signin`, { email, password }, { headers: { 'Content-Type': 'application/json' } });
    if (loginData && loginData.status === 200) {
        localStorage.setItem('email', loginData.data.data.email);
        localStorage.setItem('userType', loginData.data.data.userType);
        localStorage.setItem('token', loginData.data.data.token);
    }
    return loginData;
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
}