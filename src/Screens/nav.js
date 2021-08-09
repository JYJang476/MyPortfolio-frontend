import React, { Component } from 'react';

import '../css/nav.css';
import axios from "axios";
import ReactDOM from 'react-dom';
import * as config from "../config";
import cookie from 'react-cookies';

const axiosObj = axios.create({
    baseURL: config.HOST,
});

class Nav extends Component {

    CheckLogin() {
        const token = cookie.load('token');

        axiosObj({
            method: "get",
            url: "api/auth/check",
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        }).then(response => {
            ReactDOM.render(
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                     viewBox="0 0 36 36">
                    <path id="Icon_awesome-user-alt" data-name="Icon awesome-user-alt"
                          d="M18,20.25A10.125,10.125,0,1,0,7.875,10.125,10.128,10.128,0,0,0,18,20.25Zm9,2.25H23.126a12.24,12.24,0,0,1-10.252,0H9a9,9,0,0,0-9,9v1.125A3.376,3.376,0,0,0,3.375,36h29.25A3.376,3.376,0,0,0,36,32.625V31.5A9,9,0,0,0,27,22.5Z"/>
                </svg>,
            document.getElementsByClassName("loginDiv")[0]);
        }).catch(e => {
            ReactDOM.render(
                <div className="Profile">
                    Login
                </div>,
            document.getElementsByClassName("loginDiv")[0]);
        });
    }

    InitMenu(menu) {
        let url = window.location.href.replace("http://", "");
        let route = url.split("/")[1];
        let menus = document.getElementsByClassName("menu");

        if(menu == route)
            return "menuActive";

        return "menu";
    }

    render() {
        this.CheckLogin();
        return (
            <div>
                <div className="navDiv">
                    <a href="/">
                        <div className="leftDiv">
                            Home
                        </div>
                    </a>

                    <div className="rightDiv">
                        <div className="menuDiv">
                            <a href="/about">
                                <div className={this.InitMenu("about")}>About</div>
                            </a>
                            <a href="/project">
                                <div className={this.InitMenu("project")}>Project</div>
                            </a>
                            <a href="/mystory">
                                <div className={this.InitMenu("mystory")}>My Story</div>
                            </a>
                        </div>
                        <a className="loginRound" href="/login">
                            <div className="loginDiv">
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Nav;
