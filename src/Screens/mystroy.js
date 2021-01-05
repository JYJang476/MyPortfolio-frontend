import React, { Component } from 'react';
import Button from '../Components/button';
import Nav from './nav';
import '../css/mystoryCSS.css';

class SearchBar extends Component {
    render() {
        return (
            <div className="sch_parent">
                <input type="text" placeholder={this.props.placeholder}/>
                <div className="sch_go">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 11.889 11.891">
                        <path id="Icon_awesome-search" data-name="Icon awesome-search" d="M11.727,10.281,9.412,7.965A.557.557,0,0,0,9.017,7.8H8.639a4.828,4.828,0,1,0-.836.836v.379a.557.557,0,0,0,.163.395l2.315,2.315a.555.555,0,0,0,.787,0l.657-.657A.56.56,0,0,0,11.727,10.281ZM4.83,7.8A2.972,2.972,0,1,1,7.8,4.83,2.971,2.971,0,0,1,4.83,7.8Z"/>
                    </svg>
                </div>
            </div>
        );
    }
}

class BoardList extends Component {
    render() {
        return (
            <div className="boardList">
                <div className="list_header">
                    <div>번호</div>
                    <div>제목</div>
                    <div>날짜</div>
                </div>
                <div className="list_content">
                    <div className="list_item">
                        <div>1</div>
                        <div>제목1</div>
                        <div>2020-11-12</div>
                    </div>
                    <div className="list_item">
                        <div>1</div>
                        <div>제목2</div>
                        <div>2020-11-12</div>
                    </div>
                </div>
            </div>
        );
    }
}

class MyContent extends Component {
    render() {
        return (
            <div className="myContent">
                <div className="viewHeader">
                    <div className="titleDiv">
                        <div className="titleHeader">제목</div>
                        <div className="titleContent">좋은 제목</div>
                    </div>
                    <div className="dateDiv">
                        <div className="dateHeader">작성일</div>
                        <div className="dateContent">2020-11-11</div>
                    </div>
                </div>
                <div className="viewContent">
                    <div className="paddingArea">
                        안녕하세요
                    </div>
                </div>
            </div>
        );
    }
}

class mystory extends Component {
    render() {
        return (
            <div>
                <Nav/>
                <div className="contentArea">
                    <div className="sch_area"><SearchBar/></div>
                    <div className="storyArea">
                        <div className="ListArea">
                            <BoardList/>
                        </div>
                        <div className="ViewArea">
                            <MyContent/>
                        </div>
                        <div className="Foot"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default mystory;
