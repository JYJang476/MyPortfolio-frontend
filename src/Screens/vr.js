import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '../Components/button';
import Nav from './nav';
import '../css/mainCSS.css';
import '../css/loginCSS.css';
import axios from "axios";

const axiosObj = axios.create({
    baseURL: "http://3.89.44.193/"
})

