import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '../Components/button';
import Nav from './nav';
import '../css/mainCSS.css';
import '../css/loginCSS.css';
import axios from "axios";

class Login extends Component {
    GoLogin() {
        let id = document.getElementById("id").value;
        let pw = document.getElementById("pw").value;

        axios.post("http://3.85.8.222/login", {
            email: id,
            password: pw
        }).then((response) => {
            console.log("성공");
        }).catch((msg) => {
            ReactDOM.render(
                <p>아이디 비밀번호가 잘못되었습니다.</p>
            , document.getElementsByClassName("errorDiv")[0]);
        });
    }
    render() {
        return (
            <div>
                <Nav/>
                <div className="mainDiv">
                    <div className="subContentDiv">
                        <div className="msgDiv">
                            <p>로그인 페이지 입니다.</p>
                        </div>
                        <div className="errorDiv"></div>
                        <div className="LoginDiv">
                            <input id="id" type="text" placeholder="아이디"/>
                            <input id="pw" type="password" placeholder="비밀번호"/>
                            <div id="loginButton"><Button onClick={this.GoLogin} value="로그인"></Button></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
