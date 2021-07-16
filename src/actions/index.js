// import axios from "axios";
// import FormData from "form-data";

// export const registerOrganization = (data) => (dispatch) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   // Request body
//   const body = JSON.stringify(data);

//   return axios
//     .post(`/api/register`, body, config)
//     .then((res) => {
//       alert(`${data.org_id} Registration success`);

//       dispatch({
//         type: "REGISTER_ORGANIZATION",
//         payload: res.data,
//       });
//     })
//     .catch((err) => {
//       alert(err);
//     });
// };

// export const loginOrganization = (data) => (dispatch) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   // Request body
//   const body = JSON.stringify(data);

//   return axios
//     .post(`/api/login`, body, config)
//     .then((res) => {
//       alert(`${data.org_id} Login success`);

//       dispatch({
//         type: "LOGIN_ORGANIZATION",
//         payload: res.data,
//       });
//     })
//     .catch((err) => {
//       alert(err);
//     });
// };

// export const loginAdmin = (data) => (dispatch) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   // Request body
//   const body = JSON.stringify(data);

//   return axios
//     .post(`/api/adminlogin`, body, config)
//     .then((res) => {
//       dispatch({
//         type: "LOGIN_ADMIN",
//         payload: res.data,
//       });
//     })
//     .catch((err) => {
//       alert(err);
//     });
// };

// export const saveInteraction = (
//   data,
//   video,
//   questionType,
//   interaction_id,
//   org_id
// ) => (dispatch) => {

//   const config = {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   };
//   let table_data = `{"id": "${data[0].id}","question": "${data[0].question}","question_type": "${questionType}","answer": "${data[0].answer}"}`;

//   let formData = new FormData();

//   formData.append("interaction_id", interaction_id);
//   formData.append("org_id", org_id);
//   formData.append("table_data", table_data);
//   formData.append("type", "video");
//   formData.append("videoFile",video);


//   return axios
//     .post(`/api/interactions`, formData, config)
//     .then((res) => {      
//       dispatch({
//         type: "SAVE_INTERACTION",
//         payload: res.data.msg === "success",
//       });
//     })
//     .catch((err) => {
//       alert(err);
//     });
// };


// export const getInteractions = (org_id) => (dispatch) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   return axios
//     .get(`/api/interactions/${org_id || "scmcvc"}`, config)
//     .then((res) => {
//       dispatch({
//         type: "LOGIN_ADMIN",
//         payload: res.data,
//       });
//     })
//     .catch((err) => {
//       alert(err);
//     });
// };
