import React, { Component } from 'react';
import Button from '../Components/button';
import Nav from './nav';
import '../css/projectView.css';
import axios from "axios";
import ReactDOM from 'react-dom';

const axiosObj = axios.create({
    baseURL: 'http://3.89.44.193/api/',
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
    LeftSlide() {
        if(this.thispage == 1)
            return;

        let contentElement = document.getElementsByClassName("Content")[0];
    }

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
            url : "ppt/story",
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

    ChangeSlide(id, prjid, count) {
        let contentObj = document.getElementsByClassName('Content')[0];

        contentObj.style = 'background-image: url("http://3.89.44.193/image/'
            + id + '")';

        this.ShowLink(prjid, count);
    }

    InitSlide(id) {
        axiosObj({
            url: 'image/list',
            method: 'get',
            params: {
                'id': id
            },


        }).then((response) => {
            let jsonData = response.data;
            let pageCount = 0;
            let contentObj = document.getElementsByClassName('Content')[0];
            this.PrtPage(jsonData);

            this.ChangeSlide(jsonData[pageCount].id,
                            jsonData[0].img_projid, pageCount);
            contentObj.style = 'background-image: url("http://3.89.44.193/image/' + jsonData[pageCount].id + '")';

            let rightArrow = document.getElementsByClassName('rightArrow')[0];
            rightArrow.onclick = () => {
                if(jsonData.length > ++pageCount) {
                    this.ChangeSlide(jsonData[pageCount].id,
                        jsonData[0].img_projid, pageCount);
                }
            }

            let leftArrow = document.getElementsByClassName('leftArrow')[0];
            leftArrow.onclick = () => {
                if(jsonData.length > --pageCount) {
                    this.ChangeSlide(jsonData[pageCount].id,
                        jsonData[0].img_projid, pageCount);
                }
            }
        });
    }

    render() {
        this.InitSlide(this.props.pptId);
        return (
          <div className="ContentMain">
              <div className="leftArrow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28.032" height="54.292" viewBox="0 0 28.032 54.292">
                      <path id="Icon_ionic-ios-arrow-back" data-name="Icon ionic-ios-arrow-back" d="M19.7,33.333,38.254,12.806a4.161,4.161,0,0,0,0-5.479,3.283,3.283,0,0,0-4.963,0L12.271,30.585a4.178,4.178,0,0,0-.1,5.35l21.107,23.42a3.287,3.287,0,0,0,4.963,0,4.161,4.161,0,0,0,0-5.479Z" transform="translate(-11.251 -6.194)"/>
                  </svg>
              </div>
              <div className="ImgArea">
                  <div className="Head">
                      <div className="EditButton">
                          <svg xmlns="http://www.w3.org/2000/svg" width="40.5" height="35.993" viewBox="0 0 40.5 35.993">
                              <path id="Icon_awesome-edit" data-name="Icon awesome-edit" d="M28.308,5.85l6.342,6.342a.687.687,0,0,1,0,.97L19.294,28.519l-6.525.724a1.368,1.368,0,0,1-1.512-1.512l.724-6.525L27.337,5.85A.687.687,0,0,1,28.308,5.85ZM39.7,4.24,36.267.809a2.75,2.75,0,0,0-3.881,0L29.9,3.3a.687.687,0,0,0,0,.97l6.342,6.342a.687.687,0,0,0,.97,0L39.7,8.121a2.75,2.75,0,0,0,0-3.881ZM27,24.342V31.5H4.5V9H20.658a.865.865,0,0,0,.6-.246l2.813-2.812a.844.844,0,0,0-.6-1.441H3.375A3.376,3.376,0,0,0,0,7.875v24.75A3.376,3.376,0,0,0,3.375,36h24.75A3.376,3.376,0,0,0,31.5,32.625V21.53a.845.845,0,0,0-1.441-.6l-2.812,2.813A.865.865,0,0,0,27,24.342Z" transform="translate(0 -0.007)"/>
                          </svg>
                      </div>
                  </div>
                  <div className="Content">
                      <img id='slide' alt=""/>
                  </div>
                  <div className="PageParent">
                  </div>
              </div>
              <div className="rightArrow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28.032" height="54.292" viewBox="0 0 28.032 54.292">
                      <path id="Icon_ionic-ios-arrow-forward" data-name="Icon ionic-ios-arrow-forward" d="M30.828,33.332,12.276,12.8a4.162,4.162,0,0,1,0-5.48,3.294,3.294,0,0,1,4.963,0L38.258,30.584a4.179,4.179,0,0,1,.1,5.35L17.253,59.357a3.287,3.287,0,0,1-4.963,0,4.162,4.162,0,0,1,0-5.48Z" transform="translate(-11.246 -6.196)"/>
                  </svg>
              </div>
          </div>
        );
    }
}

const projectView = ({match}) => {
    return (
        <div>
            <Nav/>
            <SlideComponent pptId={match.params.id} src=""/>
        </div>
    );
}

export default projectView;
