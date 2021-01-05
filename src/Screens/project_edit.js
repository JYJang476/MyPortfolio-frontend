import React, { Component } from 'react';
import Button from '../Components/button';
import Nav from './nav';
import '../css/projectIO.css';

class ImageManager extends Component {
    render() {
        return (
            <div className="inputImgDiv">
                <div className="imgList"></div>
                <div className="imeAreaDiv">
                    <input type="file"/>
                </div>
            </div>
        );
    }
}

const ProjectEdit = ({match}) => {
    return (
        <div>
            <Nav/>
            <div className="ContentMain">

                <div className="titleInputDiv">
                    <input type="text"/>
                </div>

                <div className="usingTechDiv">
                    <div className="utHeader">
                        <div>사용 기술</div>
                    </div>
                    <div className="utContent">
                        <div className="utcHeader">
                            <div className="utcNo">번호</div>
                            <div className="utcTitle">제목</div>
                        </div>
                    </div>
                </div>

                <div className="inputImgDiv">
                    <div className="imgList"></div>
                    <div className="imeAreaDiv">
                        <input type="file"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectEdit;
