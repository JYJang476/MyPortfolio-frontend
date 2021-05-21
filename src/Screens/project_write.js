import React, { Component } from 'react';
import Button from '../Components/button';
import Nav from './nav';
import '../css/projectIO.css';
import axios from "axios";
import ReactDOM from 'react-dom';

const axiosObj = axios.create({
    baseURL: 'http://34.229.244.71/api/',
});


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

class ImgItem extends Component {
    render() {
        return (
          <div className="imgItem">
              <img src={this.props.src}/>
          </div>
        );
    }
}

class TechItem extends Component {
    render() {
        return(
            <div className="utcItem">
                <div className="utcNo">{this.props.id}</div>
                <div className="utcTitle">{this.props.title}</div>
            </div>
        );
    }
}

class ProjectWrite extends Component {

    constructor() {
        super();
        window.fileCount = 0;
        this.AddFileElement = this.AddFileElement.bind(this);
        this.requsetWrtie = this.requsetWrtie.bind(this);
        this.AddTech = this.AddTech.bind(this);
        this.StorySearch = this.StorySearch.bind(this);
    }

    requsetWrtie() {
        let reqFormData = new FormData();
        // 제목
        let titleObj = document.getElementById("title");
        // 기술 목록
        let techList = Array.from(document.getElementsByClassName("utcItem"));
        let techArray = [];

        let fileList = Array.from(document.getElementsByClassName("file"));

        for(let item of techList)
            techArray.push(item.children[0].textContent);

        for(let item of fileList.slice(1))
            reqFormData.append(item.id, item.files[0]);

        reqFormData.append("Title", titleObj.value);
        reqFormData.append("techJson", JSON.stringify(techArray));

        axiosObj({
            url : "api/project/write/process",
            method : "post",
            header : {
                'Content-Type': 'multipart/form-data'
            },
            data: reqFormData
        }).then(
            (response) => {
                console.log("성공");
            }
        );

        // 슬라이드 목록
    }

    StorySearch(obj) {
        let target = obj.target;

        if(target.value.length >= 2){
            if(document.getElementsByClassName("resultBox")[0] != undefined)
                document.getElementsByClassName("resultBox")[0].remove();
            axiosObj.get("mystory/search?schValue=" + target.value).then((response) => {
                let reqObj = response.data.data;
                let resultBox = document.createElement("div");

                if(reqObj) {
                    resultBox.setAttribute("class", "resultBox");

                    ReactDOM.render(
                        <div>
                        {
                            reqObj.map((d, idx) => {
                                return(
                                    <div onDoubleClick={(schObj) => {
                                        let item = schObj.target;

                                        resultBox.remove();

                                        target.parentElement.parentElement.children[0].innerHTML = d.id;
                                        target.parentElement.innerHTML = d.title;

                                        obj.target.remove();
                                    }}>
                                        {d.title}
                                    </div>
                                );
                            })
                        }
                        </div>
                    , resultBox);

                    document.getElementsByClassName("utcContent")[0].appendChild(resultBox);

                }
            });
        }
    }

    AddTech() {
        let techListObj = document.getElementsByClassName("utcContent")[0];
        let newTechItem = document.createElement("div");

        ReactDOM.render(
            <TechItem title={
                <input type="text" onChange={this.StorySearch}/>
            }/>
        ,newTechItem)

        techListObj.appendChild(newTechItem);
    }

    AddFileElement(obj) {
        let newFile = document.createElement("div");
        let ime = document.getElementById("fileList");

        ReactDOM.render(
            <input id={"file" + (++window.fileCount)} type="file" className="file" onChange={this.AddFileElement}/>
        , newFile)

        ime.appendChild(newFile);

        if(obj.target.files) {
            let inputFile = obj.target.files[0];

            let reader = new FileReader();

            reader.onload = (e) => {
                let imgArea = document.getElementsByClassName("imgList")[0];

                let newImgArea = document.createElement("div");
                imgArea.appendChild(newImgArea);

                ReactDOM.render(
                    <ImgItem src={e.target.result}/>
                , newImgArea);
            }

            reader.readAsDataURL(inputFile);
        }
    }

    render() {

        return (
            <div>
                <Nav/>
                <div className="ContentMainWrite">

                    <div className="titleInputDiv">
                        <input id="title" type="text" placeholder="제목"/>
                    </div>

                    <div className="usingTechDiv">
                        <div className="utHeader">
                            <div>사용 기술</div>
                            <div className="addButton" onClick={this.AddTech}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18.65" height="18.65" viewBox="0 0 18.65 18.65">
                                    <path id="Icon_awesome-plus-circle" data-name="Icon awesome-plus-circle" d="M9.887.563a9.325,9.325,0,1,0,9.325,9.325A9.323,9.323,0,0,0,9.887.563ZM15.3,10.94a.453.453,0,0,1-.451.451H11.391v3.459a.453.453,0,0,1-.451.451H8.835a.453.453,0,0,1-.451-.451V11.391H4.924a.453.453,0,0,1-.451-.451V8.835a.453.453,0,0,1,.451-.451H8.383V4.924a.453.453,0,0,1,.451-.451H10.94a.453.453,0,0,1,.451.451V8.383h3.459a.453.453,0,0,1,.451.451Z" transform="translate(-0.563 -0.563)"/>
                                </svg>
                            </div>
                        </div>
                        <div className="utContent">
                            <div className="utcHeader">
                                <div className="utcNo">번호</div>
                                <div className="utcTitle">제목</div>
                            </div>
                            <div className="utcContent">
                            </div>
                        </div>
                    </div>

                    <div className="inputImgDiv">
                        <div className="imgList"></div>
                        <div id="imeArea" className="imeAreaDiv">
                            <div id="fileList" className="fileList">
                                <input onChange={this.AddFileElement} id="file0" className="file" type="file"/>
                            </div>
                        </div>
                    </div>

                    <div className="foot">
                        <Button value="확인" onClick={this.requsetWrtie}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectWrite;
