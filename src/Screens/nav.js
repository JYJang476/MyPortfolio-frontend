import React, { Component } from 'react';

import '../css/nav.css';


class Nav extends Component {
    render() {
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
                            <a href="/index/about">
                                <div className="menu">About</div>
                            </a>
                            <a href="/project">
                                <div className="menu">Project</div>
                            </a>
                            <a href="/mystory">
                                <div className="menu">My Story</div>
                            </a>
                        </div>
                        <a className="loginRound" href="/login">
                            <div className="loginDiv">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                     viewBox="0 0 36 36">
                                    <path id="Icon_awesome-user-alt" data-name="Icon awesome-user-alt"
                                          d="M18,20.25A10.125,10.125,0,1,0,7.875,10.125,10.128,10.128,0,0,0,18,20.25Zm9,2.25H23.126a12.24,12.24,0,0,1-10.252,0H9a9,9,0,0,0-9,9v1.125A3.376,3.376,0,0,0,3.375,36h29.25A3.376,3.376,0,0,0,36,32.625V31.5A9,9,0,0,0,27,22.5Z"/>
                                </svg>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Nav;
