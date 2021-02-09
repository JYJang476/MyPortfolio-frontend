import React, { Component } from 'react';
import Button from '../Components/button';
import Nav from './nav';
import '../css/project.css';
import axios from "axios";
import ReactDOM from 'react-dom';

const axiosObj = axios.create({
    baseURL: 'http://3.89.44.193/api/',
});

class ImageBox extends Component {
    render() {
        return (
            <div className="imgBoxDiv" onClick={this.props.onClick}>
                <img src={this.props.url}/>
                <div className="imgTitle">{this.props.title}</div>
            </div>
        );
    }
}

class ProjectMainView extends Component {
    prtProject() {
        axiosObj.get("project").then((response) => {
            let resObj = response.data.data;

            ReactDOM.render(
                <div className="prjList">
                    {resObj.map((d, idx) => {
                        return(
                            <ImageBox url={"http://3.89.44.193/image/" + d.img_id}
                                      title={d.project_name} onClick={() => this.goView(d.id)}/>
                        );
                    })}
                </div>
            , document.getElementsByClassName("prjList")[0]);
        });
    }

    goView(id) {
        window.location.href = "/project/" + id;
    }

    goWrite() {
        window.location.href = "/project/write";
    }

    render() {
        this.prtProject();
        return(
          <div>
              <Nav/>
              <div className="prjContentParent">
                  <div className="prjContent">
                      <div className="prjTitle">내 프로젝트</div>
                      <div className="prjListParent">
                          <div className="prjList">
                          </div>
                      </div>
                      <div className="FootDiv" onClick={this.goWrite}>
                          <Button value="글쓰기"/>
                      </div>
                  </div>
              </div>
          </div>
        );

    }
}

export default ProjectMainView;
