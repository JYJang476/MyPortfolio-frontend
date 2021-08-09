import React, { Component } from 'react';
import Button from '../Components/button';
import Nav from './nav';
import '../css/project.css';
import axios from "axios";
import * as config from '../config';
import ReactDOM from 'react-dom';
import cookie from "react-cookies";

const axiosObj = axios.create({
    baseURL: config.HOST,
});

class ImageBox extends Component {
    render() {
        return (
            <div className="imgBoxDiv" onClick={this.props.onClick}>
                <div className="bgDiv"></div>
                <img src={this.props.url}/>
                <div className="imgTitle">{this.props.title}</div>
            </div>
        );
    }
}

class ProjectMainView extends Component {
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
                <Button value="글쓰기"/>,
                document.getElementsByClassName("FootDiv")[0]);
        });
    }

    prtProject(page) {
        axiosObj.get(`api/project/list/${page}`).then((response) => {
            let resObj = response.data.data.project;

            ReactDOM.render(
                <div className="prjList">
                    {resObj.map((d, idx) => {
                        return(
                            <ImageBox url={config.HOST + "api/image/" + d.img_id}
                                      title={d.project_name} onClick={() => this.goView(d.id)}/>
                        );
                    })}
                </div>
            , document.getElementsByClassName("prjList")[0]);

            this.prtPage(0, response.data.data.pageCount, page);
        });
    }

    prtPage(block, count, thisPage) {
        const START_PAGE = block * 10 + 1;
        const END_PAGE = 10;
        const ITEM_WIDTH = 26;

        let pageContent = document.getElementsByClassName("pageDiv")[0];
        let i = 0;
        // 모든 자식 삭제
        while(pageContent.hasChildNodes())
            pageContent.removeChild(pageContent.firstChild);

        for(i = START_PAGE; i < END_PAGE; i++) {
            if(i > count)
                break;
            let iCount = i;
            let pageDiv = document.createElement("div");
            if(i == thisPage)
                pageDiv.setAttribute("style", "background-color:#141518;color:white");
            pageDiv.setAttribute("class", "pageItem");
            pageDiv.innerText = i.toString();
            pageDiv.onclick = (obj) => {
                this.prtScreen(iCount);
            }
            pageContent.appendChild(pageDiv);
        }
        pageContent.setAttribute("style", "width:" + (ITEM_WIDTH * i - 5) + "px");
    }

    goView(id) {
        window.location.href = "/project/" + id;
    }

    goWrite() {
        window.location.href = "/project/write";
    }

    render() {
        this.prtProject(1);
        this.CheckLogin();
        return(
          <div>
              <Nav/>
              <div className="prjContentParent">
                  <div className="prjContent">
                      <div className="prjTitle">내 프로젝트</div>
                      <div className="prjListParent">
                          <div className="prjList">
                          </div>
                          <div className="prjFoot">
                              <div className="pageDiv">
                              </div>
                          </div>
                      </div>
                      <div className="FootDiv" onClick={this.goWrite}>
                          <div className="pageDiv">
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        );

    }
}

export default ProjectMainView;
