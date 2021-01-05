import React, { Component } from 'react';
import Button from '../Components/button';
import Nav from './nav';
import '../css/mainCSS.css';

class aaa extends Component {
    render() {
        return (
            <div>
                <Nav/>
                <div className="mainDiv">
                    <div className="subContentDiv">
                        <div className="msgDiv">
                            <p>안녕하십니까 장주영의 홈페이지입니다.</p>
                            <p>방문을 환영합니다.</p>
                            <p>관리자이시면 로그인을 해주세요</p>
                        </div>
                        <div className="loginButtonDiv">
                            <a href="">
                                <Button className='mainbuttonStyle' value='로그인'/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default aaa;
