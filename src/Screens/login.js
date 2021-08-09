import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '../Components/button';
import Nav from './nav';
import '../css/mainCSS.css';
import '../css/loginCSS.css';
import * as config from '../config';
import axios from "axios";
import cookie from 'react-cookies';

class Login extends Component {
    constructor(props) {
        super(props);

        this.GoLogin = this.GoLogin.bind(this);
    }

    GoLogin() {
        let id = document.getElementById("id").value;
        let pw = document.getElementById("pw").value;

        axios({
            method: "post",
            url: config.HOST + "api/auth/login",
            data: {
                id: id,
                pw: pw
            }
        }).then((response) => {
            cookie.save("token", response.data);
            this.props.history.push("/");
        }).catch((msg) => {
            if(msg.response) {
                // 로그인 실패
                if (msg.response.status = 404)
                    ReactDOM.render(
                        <p>아이디 비밀번호가 잘못되었습니다.</p>
                        , document.getElementsByClassName("errorDiv")[0]);
                else if (msg.response.status == 403) // 토큰 유효성 에러
                {
                    alert('세션시간이 만료되었습니다.');
                    this.props.history.push("/");
                }
            }
        });
    }

    render() {
        return (
            <div>
                <Nav/>
                <div className="mainDiv">
                    <div className="subContentDiv">
                        <div className="LoginMsgDiv">
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
