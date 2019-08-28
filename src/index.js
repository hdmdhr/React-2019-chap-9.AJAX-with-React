import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

const reqInterceptor = axios.interceptors.request.use(reqConfig => {
    console.log("REQ CONFIG",reqConfig);
    // can edit request before return (sending)
    return reqConfig
},
error => {
    console.log(error);  // request sending error
    return Promise.reject(error)
})


const resInterceptor = axios.interceptors.response.use(res => {
    console.log("RES", res);
    return res
},
error => {
    console.log(error);
    return Promise.reject(error)
})

// disable interceptors
axios.interceptors.request.eject(reqInterceptor)
axios.interceptors.response.eject(resInterceptor)

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
