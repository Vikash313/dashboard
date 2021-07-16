import axios from 'axios';
import { API_URL, FILE_URL } from '../constant/actionTypes'

let token = localStorage.getItem('token');
token = token && token !== '' ? token : '';

const Instance = axios.create({
  // baseURL: 'http://13.127.39.199:3000',
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token 
  }
});

const MultipartInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': 'Bearer ' + token 
  }
});

const exportConst = { Instance, MultipartInstance}
export default exportConst;

axios.interceptors.request.use(request => {
  // Edit request config
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  if (typeof response !== Object && typeof response !== 'object')
    JSON.parse(response);
  // Edit response config
  return response;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

export const apiHeader = {
  headers : {
    "content-type" : "application/json"
  }
}

export const sessionActivity = {
  eventName: "heartBeat",
	performedOn:"signal",
}

export const quesClickActivity = {
  eventName: "questionClick",
	performedOn:"text",
  action:"click",
}

export const micClickActivity = {
  eventName: "micClick",
	performedOn:"button",
  action:"click",
}

export const leadSubmit = {
  eventName: "submitLeadForm",
  performedOn:"button",
  action:"click",
}

export const cancelLeadActivity = {
  eventName: "cancelLeadForm",
	performedOn:"button",
  action:"click",
}

export const questionAskedVar = {
  eventName: "questionAsked",
	performedOn:"text",
  action:"click",
}

export const botIconClick = {
  eventName: "botIconClick",
	performedOn:"text",
  action:"click",
}

export const botClose = {
  eventName: "botClose",
	performedOn:"button",
  action:"click",
}