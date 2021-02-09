import React, { Component } from 'react';
import Button from '../Components/button';
import Nav from './nav';
import axios from "axios";
import '../css/projectView.css';

class SendTest extends Component {
    sendServer() {
        axios({
            method : 'get',
            data : {
                userId : 'SZ4S71'
            }
        }).then((response) => {
            console.log(response.data);
        });
    }

    render() {
        return(
            <div>
                <button onClick={this.sendServer}></button>
            </div>
        );
    }
}

export default SendTest;
