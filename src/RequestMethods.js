import axios from "axios";
const BASE_URL = "http://localhost:5000/api/";

// let TOKEN="abcd"

// if(localStorage.getItem("persist:root")!=null)
// {
//   TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken 
// };

// console.log(TOKEN);

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   headers: { token: `Token ${TOKEN}`},
// });
