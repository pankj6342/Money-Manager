import axios from 'axios';
export const instance = axios.create({
    // baseURL: "https://money-manager-backend-lake.vercel.app/",
    // baseURL:"http://localhost:1234/",
    baseURL: process.env.NODE_ENV === 'production' ? "https://money-manager-backend-49iw.onrender.com/" : "http://localhost:1234/",
    // timeout: 4000,
//     headers: {'reqcomingfrom': 'web','lang':'en','accept':'json','apikey':'ABCD123'}
}
);

export default function setAuthorizationToken(token){
    if(token){
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    }else{
        delete instance.defaults.headers.common['Authorization'];
    }
}
// instance.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     // console.log("Request Interceptor Call"+localStorage.tokenId );
//     // config.headers['token']=localStorage.tokenId;
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });