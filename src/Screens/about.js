import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Nav from './nav';
import '../css/mainCSS.css';
import * as config from '../config';
import axios from "axios";
import '../css/about.css';

const axiosObj = axios.create({
    baseURL: config.HOST
});

class about extends Component {

    render() {
        axiosObj({
           method: "get",
           url: "/api/stack"
        }).then(response => {
            console.log(response.data);
            ReactDOM.render(
                <div className="stackDiv">
                    {
                        response.data.map((d, idx) => {
                            return (
                                <div className="stackItem">
                                    <div className="article">{d.article}</div>
                                    <div className="arrow"></div>
                                    <div className="description">{d.description}</div>
                                </div>
                            )
                        })
                    }
                </div>
            , document.getElementsByClassName("desScript")[0]);
        });
        return (
            <div>
                <Nav/>
                <div className="mainDiv">
                    <div className="profileDiv">
                        <img src={`${config.HOST}api/image/3`} className="profileImg"></img>
                    </div>
                    <div className="descriptionDiv">
                        <div className="desHeader">항상 새로운 것을 추구</div>
                        <div className="desScript"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default about;
