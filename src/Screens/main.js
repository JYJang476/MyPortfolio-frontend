import React, { Component } from 'react';
import Nav from './nav';
import '../css/mainCSS.css';

class Main extends Component {
    render() {
        return (
            <div>
                <Nav/>
                <div className="msgDiv">
                    <div className="gradientDiv">
                    </div>
                    <div className="msgContentDiv">
                        <p>한계를 모르는 개발자</p>
                        <a href="project">
                            <button className='mainbuttonStyle'>프로젝트</button>
                        </a>
                    </div>
                </div>
                <div className="mainDiv">
                    <div className="subContentDiv">
                        <div className="loginButtonDiv">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
