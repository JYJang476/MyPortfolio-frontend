import React, { Component } from 'react';
import Button from '../Components/button';
import Nav from './nav';
import '../css/project.css';

class ImageBox extends Component {
    render() {
        return (
            <div className="imgBoxDiv">
                <img src={this.props.url}/>
                <div className="imgTitle">{this.props.title}</div>
            </div>
        );
    }
}

class ProjectMainView extends Component {
    render() {
        return(
          <div>
              <Nav/>
              <div className="prjContentParent">
                  <div className="prjContent">
                      <div className="prjTitle">내 프로젝트</div>
                      <div className="prjListParent">
                          <div className="prjList">
                              <ImageBox url="https://placeimg.com/200/200/any" title="tt1"/>
                              <ImageBox url="https://placeimg.com/200/200/any" title="tt1"/>
                              <ImageBox url="https://placeimg.com/200/200/any" title="tt1"/>
                              <ImageBox url="https://placeimg.com/200/200/any" title="tt1"/>
                          </div>
                      </div>
                      <div className="FootDiv">
                          <Button value="글쓰기"/>
                      </div>
                  </div>
              </div>
          </div>
        );
    }
}

export default ProjectMainView;
