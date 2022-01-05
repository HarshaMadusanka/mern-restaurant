import React from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
// import {token} from '../src/components/login/Login'

const hostname = window.location.hostname;
let baseURL;
if(hostname=='localhost'){
    baseURL='http://localhost:4000/api/'
} else{
    baseURL = 'https://mern-stack-restaurant-website.herokuapp.com/api/'
}

export const Axios = axios.create({
    baseURL:baseURL,
    withCredentials:true,
})