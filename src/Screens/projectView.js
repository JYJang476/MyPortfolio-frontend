import React, { Component } from 'react';
import Button from '../Components/button';
import Nav from './nav';
import '../css/projectView.css';
import axios from "axios";
import * as config from '../config';
import ReactDOM from 'react-dom';
import cookie from "react-cookies";

const axiosObj = axios.create({
    baseURL: config.HOST,
});

class LinkButton extends Component {
    render() {
        return (
            <div id={this.props.id} className="linkParent">
                <div className="linkContent">{this.props.content}</div>
            </div>
        )
    }
}

class SlideComponent extends Component {
    PrtPage(slideList) {
        ReactDOM.render(
            <div className="Page">
                {slideList.map((d, idx) => {
                    return (
                        <span className="PageItem">{idx + 1}</span>
                    );
                })}
            </div>
        , document.getElementsByClassName('PageParent')[0]);
    }

    DeleteLink() {
        let link = document.getElementById("linkButton");

        if(link != undefined)
            link.remove();
    }

    ShowLink(id, no) {
        return axiosObj({
            url : "api/ppt/story",
            method : "get",
            params : {
                "projId" : id,
                "pptNo" : no
            },
            responseType: 'json'
        }).then((response) => {
            ReactDOM.render(
                <LinkButton id="linkButton" content={response.data.title}/>
            , document.getElementsByClassName("Content")[0]);

            let link = document.getElementById("linkButton");

            link.onclick = () => {
                window.location.href = "/mystory/view/" + response.data.id;
            }
        }).catch((error) => {
            this.DeleteLink();
        });
    }

    ChangeSlide(count) {
        let slideObj = document.getElementsByClassName('slideList')[0];

        slideObj.style.marginLeft = (560 * count * -1) + "px";
    }

    InitSlide(id) {
        axiosObj({
            url: 'api/list/image',
            method: 'get',
            params: {
                'id': id
            },
        }).then((response) => {
            let jsonData = response.data;
            let pageCount = 0;
            let contentObj = document.getElementsByClassName('Content')[0];

            ReactDOM.render(
                <ul className="slideList">
                    {
                        jsonData.map((d, idx) => {
                            return (
                                <li>
                                    <img id="slide" src={config.HOST + 'api/image/' + d.id}/>
                                </li>
                            );
                        })
                    }
                </ul>
            , contentObj);

            let slideObj = document.getElementsByClassName('slideList')[0];
            slideObj.style = 'width: ' + (jsonData.length * 560) + 'px';

            let rightArrow = document.getElementsByClassName('rightArrow')[0];
            rightArrow.onclick = () => {
                if(jsonData.length - 1 > pageCount)
                    this.ChangeSlide(++pageCount);
            }

            let leftArrow = document.getElementsByClassName('leftArrow')[0];
            leftArrow.onclick = () => {
                if(0 < pageCount)
                    this.ChangeSlide(--pageCount);
            }
        });
    }

    // 프로젝트 로드
    InitProject(id) {
        axiosObj({
            url: "api/project/view/" + id,
            method: "get",
        }).then((response) => {
            // 프로젝트 정보 로딩
            let data = response.data.data;

            let titleObj = document.getElementById("TitleTag");
            titleObj.innerText = data.title;

            let storyObj = document.getElementsByClassName("StoryList")[0];

            ReactDOM.render(
                <div>
                    {
                        data.storys.map((d, idx) => {
                           return (
                               <div>
                                   <ExtendStory title={d.title} content={d.content}/>
                               </div>
                           );
                        })
                    }
                </div>
            , storyObj);
            this.InitSlide(id);
        });
    }

    render() {
        this.InitProject(this.props.pptId);
        const token = cookie.load('token');
        axiosObj({
            method: "get",
            url: "api/auth/check",
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        }).then((response) => {
           ReactDOM.render(
               <div className="EditButton">
                   수정
               </div>,
           document.getElementById("EditParent"));
        });
        return (
          <div className="ContentMain">
              <div className="SlideDiv">
                  <div className="leftArrow">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28.032" height="54.292" viewBox="0 0 28.032 54.292">
                          <path id="Icon_ionic-ios-arrow-back" data-name="Icon ionic-ios-arrow-back" d="M19.7,33.333,38.254,12.806a4.161,4.161,0,0,0,0-5.479,3.283,3.283,0,0,0-4.963,0L12.271,30.585a4.178,4.178,0,0,0-.1,5.35l21.107,23.42a3.287,3.287,0,0,0,4.963,0,4.161,4.161,0,0,0,0-5.479Z" transform="translate(-11.251 -6.194)"/>
                      </svg>
                  </div>
                  <div className="ImgArea">
                      <div className="Head">
                          <div id="TitleTag" className="TitleTag"></div>
                          <div>
                              <a id="EditParent" href={"edit/" + this.props.pptId}>
                              </a>
                          </div>
                      </div>
                      <div className="Content"></div>
                  </div>
                  <div className="rightArrow">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28.032" height="54.292" viewBox="0 0 28.032 54.292">
                          <path id="Icon_ionic-ios-arrow-forward" data-name="Icon ionic-ios-arrow-forward" d="M30.828,33.332,12.276,12.8a4.162,4.162,0,0,1,0-5.48,3.294,3.294,0,0,1,4.963,0L38.258,30.584a4.179,4.179,0,0,1,.1,5.35L17.253,59.357a3.287,3.287,0,0,1-4.963,0,4.162,4.162,0,0,1,0-5.48Z" transform="translate(-11.246 -6.196)"/>
                      </svg>
                  </div>
              </div>
          </div>
        );
    }
}

class ExtendStory extends Component {

    OpenExtend(obj) {
        let targetObj = obj.target.parentElement.children[1];
        if(targetObj.style.display == "")
            targetObj.style.display = "block";
        else
            targetObj.style.display = "";
    }

    render() {
        return (
            <div className="StoryParent">
                <div className="StoryItem">
                    <div className="StoryHeader" onClick={this.OpenExtend}>{this.props.title}</div>
                    <div className="StoryContent">
                        <div dangerouslySetInnerHTML={{__html: this.props.content}}></div>
                    </div>
                </div>
            </div>
        );
    }
}

const projectView = ({match}) => {
    return (
        <div className="ViewMain">
            <Nav/>
            <SlideComponent pptId={match.params.id} src=""/>
            <div className="Storys">참고 자료</div>
            <div className="StoryList"></div>
        </div>
    );
}

export default projectView;
