import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '../Components/button';
import Moment from 'react-moment';
import Nav from './nav';
import '../css/mystoryCSS.css';
import axios from "axios";

const axiosObj = axios.create({
    baseURL: "http://34.229.244.71/"
});

class SearchBar extends Component {
    goSearch() {
        let textbox = document.getElementById("schtext");
        if(textbox != undefined)
            axiosObj.get("api/mystory/search?schValue=" + textbox.value).then((response) => {
                prtStoryList(response.data.data);
            }).catch((e) => {
                if(e.response.status == 404)
                    ReactDOM.render(
                        <div>
                            검색결과가 없습니다.
                        </div>
                        , document.getElementsByClassName("list_content")[0]);
            });
    }

    render() {
        return (
            <div className="sch_parent">
                <input id="schtext" type="text" placeholder={this.props.placeholder}/>
                <div className="sch_go" onClick={this.goSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 11.889 11.891">
                        <path id="Icon_awesome-search" data-name="Icon awesome-search" d="M11.727,10.281,9.412,7.965A.557.557,0,0,0,9.017,7.8H8.639a4.828,4.828,0,1,0-.836.836v.379a.557.557,0,0,0,.163.395l2.315,2.315a.555.555,0,0,0,.787,0l.657-.657A.56.56,0,0,0,11.727,10.281ZM4.83,7.8A2.972,2.972,0,1,1,7.8,4.83,2.971,2.971,0,0,1,4.83,7.8Z"/>
                    </svg>
                </div>
            </div>
        );
    }
}

function prtContent(data) {
    let storyContent = document.getElementsByClassName("ViewArea")[0];
    let storyData = data;

    ReactDOM.render(<MyContent title={storyData.title} content={storyData.content}
                               date={storyData.date}/>, storyContent);
}

function prtStoryList(data) {
    let storyList = document.getElementsByClassName("list_content")[0];
    let storyDatas = data;

    ReactDOM.render(
        <div>
            {storyDatas.map((d, idx) => {
                return (
                    <div className="list_item" onClick={() => { prtContent(d) }}>
                        <div>{d.id}</div>
                        <div>{d.title}</div>
                        <div>
                            <Moment format="YYYY-MM-DD">
                                {d.date}
                            </Moment>
                        </div>
                    </div>
                )
            })}
        </div>
        , storyList);
}

class BoardList extends Component {
    prtScreen(id) {
        axiosObj.get('mystory').then((response) => {
            let resObj = response.data;

            this.prtStoryList(resObj.data.storys);
        });

        axiosObj.get('api/mystory/' + id)
            .then((response) => {
                this.prtContent(response.data.data);
            });

    }

    prtStoryList(data) {
        let storyList = document.getElementsByClassName("list_content")[0];
        let storyDatas = data;

        ReactDOM.render(
            <div>
                {storyDatas.map((d, idx) => {
                    this.prtContent = this.prtContent.bind(this);
                    return (
                        <div className="list_item" onClick={() => { this.prtContent(d) }}>
                            <div>{d.id}</div>
                            <div>{d.title}</div>
                            <div>
                                <Moment format="YYYY-MM-DD">
                                    {d.date}
                                </Moment>
                            </div>
                        </div>
                    )
                })}
            </div>
            , storyList);
    }

    prtContent(data) {
        let storyContent = document.getElementsByClassName("ViewArea")[0];
        let storyData = data;

        ReactDOM.render(<MyContent title={storyData.title} content={storyData.content}
                                   date={storyData.date}/>, storyContent);
    }

    render() {
        this.prtScreen(this.props.id);

        return (
            <div className="boardList">
                <div className="list_header">
                    <div>번호</div>
                    <div>제목</div>
                    <div>날짜</div>
                </div>
                <div className="list_content">
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
                        <div className="titleContent">{this.props.title}</div>
                    </div>
                    <div className="dateDiv">
                        <div className="dateHeader">작성일</div>
                        <div className="dateContent">{this.props.date}</div>
                    </div>
                </div>
                <div className="viewContent">
                    <div className="paddingArea">
                        {this.props.content}
                    </div>
                </div>
            </div>
        );
    }
}

const mystory = ({match}) => {
    const STORYID = match.params.id == undefined ? 6 : match.params.id;

    return (
        <div>
            <Nav/>
            <div className="contentArea">
                <div className="sch_area"><SearchBar placeholder="검색"/></div>
                <div className="storyArea">
                    <div className="ListArea">
                        <BoardList id={STORYID}/>
                    </div>
                    <div className="ViewArea">
                    </div>
                </div>
                <div className="Foot">
                    <a href="/mystory/write"><Button value="글쓰기"/></a>
                </div>
            </div>
        </div>
    );
}

export default mystory;
