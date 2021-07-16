//CUSTOMIZER 
export const ADD_COSTOMIZER = "ADD_COSTOMIZER";
export const ADD_LAYOUT = "ADD_LAYOUT";
export const ADD_SIDEBAR_TYPES = "ADD_SIDEBAR_TYPES";
export const ADD_SIDEBAR_SETTINGS = "ADD_SIDEBAR_SETTINGS";
export const ADD_COLOR = "ADD_COLOR";
export const ADD_MIXlAYOUT = "ADD_MIXlAYOUT";
export const JOBS_ADMIN = "/jobs-admin";
var API_LINK, SOCKET_LINK, FILE_LINK;

const testAdminAddr = 'testexpapp.expertrons.com';
const localhostAdminAddr = 'localhost';
if (window.location.href.indexOf(testAdminAddr) > -1 || window.location.href.indexOf(localhostAdminAddr) > -1) {
    // API_LINK = 'http://localhost:3000/api/';
    API_LINK = 'https://testexpapp.expertrons.com/api/';
    FILE_LINK = 'https://expertrons-app-test.s3.ap-south-1.amazonaws.com/';
} else {
    // API_LINK = 'http://localhost:3000/api/';
    API_LINK = 'https://prodn.expertrons.com/api/';
    FILE_LINK = 'https://expertrons-v2.s3.ap-south-1.amazonaws.com/';
    // API_LINK = 'https://testexpapp.expertrons.com/api/';
}
// export const API_URL = API_LINK;
// export const API_LINK = 'http://b2b.expertrons.com/';
// export const API_URL = 'http://13.126.115.206/api/';

// export const API_URL = 'http://3.6.135.61/api/';
export const API_URL = API_LINK;
export const SOCKET_URL = SOCKET_LINK;
export const FILE_URL = FILE_LINK;