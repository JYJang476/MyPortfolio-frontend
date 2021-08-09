import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Moment from 'react-moment';
import Nav from './nav';
import '../css/mystoryCSS.css';
import * as config from '../config';
import axios from "axios";
import cookie from "react-cookies";

const axiosObj = axios.create({
    baseURL: config.HOST
});

class Board extends Component {
    constructor(props) {
        super(props);
    }

    GoSearch(text) {
        if(text != undefined)
            axiosObj.get("api/mystory/search?schValue=" + text).then((response) => {
                this.prtStoryList(response.data.data, 1);
                this.prtPage(0, response.data.data.pageCount, 1);
            }).catch((e) => {
                ReactDOM.render(
                    <div>
                        검색결과가 없습니다.
                    </div>
                    , document.getElementsByClassName("list_content")[0]);
            });
    }

    prtScreen(id) {
        axiosObj.get(`api/mystory/list/${id}`).then((response) => {
            let thisPageBlock = 0;
            let pageCount = response.data.data.pageCount;

            this.prtStoryList(response.data.data, id);
            this.prtPage(thisPageBlock, pageCount, id);
            let leftPage = document.getElementsByClassName("pageLeft")[0];
            let rightPage = document.getElementsByClassName("pageRight")[0];

            leftPage.onclick = () => {
                if(thisPageBlock > 0) {
                    thisPageBlock--;
                    this.prtPage(thisPageBlock, pageCount, id);
                }
            }

            rightPage.onclick = () => {
                console.log(thisPageBlock);
                if(thisPageBlock < pageCount - 1) {
                    thisPageBlock++;
                    this.prtPage(thisPageBlock, pageCount, id);
                }
            }

        });
    }

    prtStoryList(data, pageId) {
        let storyList = document.getElementsByClassName("list_content")[0];
        let storyDatas = data.storys;
        let boardList = document.getElementById("BoardList");
        let listArea = document.getElementById("ListArea");

        ReactDOM.render(
            <div className="list_content_sub">
                {storyDatas.map((d, idx) => {
                    this.prtContent = this.prtContent.bind(this);

                    return (
                        <div className="list_item_parent">
                            <div className="list_item" onClick={() => {
                                    // 글 선택과 동시에 글 목록창을 닫는다.
                                    boardList.setAttribute("style", "display:none");
                                    listArea.setAttribute("style", "width:30px");
                                    this.prtContent(d.id)
                                }}>
                                <div>{d.id}</div>
                                <div>{d.title}</div>
                                <div>
                                    <Moment format="YYYY-MM-DD">
                                        {d.date}
                                    </Moment>
                                </div>
                            </div>
                            <div className="list_delete" onClick={ (obj) => this.DeleteStory(d.id, obj.target, pageId) }>
                                <svg height="16pt" viewBox="0 0 512 512" width="16pt" xmlns="http://www.w3.org/2000/svg"><path d="m453.332031 0h-394.664062c-32.363281 0-58.667969 26.304688-58.667969 58.667969v394.664062c0 32.363281 26.304688 58.667969 58.667969 58.667969h394.664062c32.363281 0 58.667969-26.304688 58.667969-58.667969v-394.664062c0-32.363281-26.304688-58.667969-58.667969-58.667969zm0 0" fill="#f44336"/><path d="m350.273438 320.105469c8.339843 8.34375 8.339843 21.847656 0 30.167969-4.160157 4.160156-9.621094 6.25-15.085938 6.25-5.460938 0-10.921875-2.089844-15.082031-6.25l-64.105469-64.109376-64.105469 64.109376c-4.160156 4.160156-9.621093 6.25-15.082031 6.25-5.464844 0-10.925781-2.089844-15.085938-6.25-8.339843-8.320313-8.339843-21.824219 0-30.167969l64.109376-64.105469-64.109376-64.105469c-8.339843-8.34375-8.339843-21.847656 0-30.167969 8.34375-8.339843 21.824219-8.339843 30.167969 0l64.105469 64.109376 64.105469-64.109376c8.34375-8.339843 21.824219-8.339843 30.167969 0 8.339843 8.320313 8.339843 21.824219 0 30.167969l-64.109376 64.105469zm0 0" fill="#fafafa"/></svg>
                            </div>
                        </div>
                    )
                })}
            </div>
            , storyList);
    }

    prtPage(block, count, thisPage) {
        const START_PAGE = block * 10 + 1;
        const END_PAGE = 10;
        const ITEM_WIDTH = 26;

        let pageContent = document.getElementsByClassName("pageNumber")[0];
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

    prtContent(id) {
        let storyContent = document.getElementsByClassName("ViewArea")[0];

        axiosObj({
            method: "get",
            url: `api/mystory/view/${id}`
        }).then(response => {
            let storyData = response.data.data.story;
            let tagData = response.data.data.tag;

            ReactDOM.render(<MyContent title={storyData.title} content={storyData.content}
                                       date={storyData.date} tag={tagData}/>, storyContent);
        });
    }

    DeleteStory(id, obj, pageId) {
        let listContent = document.getElementsByClassName("list_content_sub")[0];
        const token = cookie.load('token');

        if(window.confirm("정말로 삭제 하시겠습니까?")) {
            axiosObj({
                method: "delete",
                url: `api/mystory/${id}`,
                headers: {
                    "Authorization" : `Bearer ${token}`
                }
            }).then(response => {
                this.prtScreen(pageId);
                alert("성공적으로 삭제하였습니다.");
            }).catch(e => {
                if(e.response.data.code == 403) {
                    alert("권한이 없습니다. 로그인 해주세요");
                    window.location.href = "/login";
                } else if(e.response.data.code == 405)
                    alert("권한이 없습니다. 본인 계정으로 로그인 해주세요");

            });
        }
    }

    ClickTag(obj, tag) {
        try {
            if (this.state.isClick == true) {
                if(obj.classList[0] == "CloudDiv") {
                    this.GoSearch(tag);
                    obj.parentElement.parentElement.removeChild(obj.parentElement);
                }

                this.setState({
                    isClick: false
                })
            } else if (document.getElementsByClassName("CloudDiv").length == 0) {
                let newDiv = document.createElement("div");
                ReactDOM.render(
                    <div className="GoSchDiv">
                        <div className="CloudDiv">태그로 검색</div>
                    </div>
                    , newDiv);
                obj.appendChild(newDiv)
                this.setState({
                    isClick: true
                });
            } else {
                obj.removeChild(obj.childNodes[1]);
            }
        }catch(e) {
            if(e.name == "TypeError") {
                let newDiv = document.createElement("div");
                ReactDOM.render(
                    <div className="GoSchDiv">
                        <div className="CloudDiv">태그로 검색</div>
                    </div>
                    , newDiv);
                obj.appendChild(newDiv)
                this.setState({
                    isClick: true
                });
            }
        }
    }
}

class SearchBar extends Board {
    render() {
        return (
            <div className="sch_parent">
                <input id="schtext" type="text" placeholder={this.props.placeholder} onKeyPress={(key) => {
                    if(key.charCode === 13)
                        this.GoSearch(document.getElementById("schtext").value)
                }}/>
                <div className="sch_go" onClick={() => this.GoSearch(document.getElementById("schtext").value)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 11.889 11.891">
                        <path id="Icon_awesome-search" data-name="Icon awesome-search" d="M11.727,10.281,9.412,7.965A.557.557,0,0,0,9.017,7.8H8.639a4.828,4.828,0,1,0-.836.836v.379a.557.557,0,0,0,.163.395l2.315,2.315a.555.555,0,0,0,.787,0l.657-.657A.56.56,0,0,0,11.727,10.281ZM4.83,7.8A2.972,2.972,0,1,1,7.8,4.83,2.971,2.971,0,0,1,4.83,7.8Z"/>
                    </svg>
                </div>
            </div>
        );
    }
}

class BoardList extends Board {

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
                <div className="list_foot">
                    <div className="pageLeft"></div>
                    <div className="pageNumber"></div>
                    <div className="pageRight"></div>
                </div>
            </div>
        );
    }
}

class MyContent extends Board {
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
                    <div dangerouslySetInnerHTML={{ __html:this.props.content }} className="paddingArea">

                    </div>
                    <div className="tagDiv">
                        {
                            this.props.tag.map((d, idx) => {
                                return (
                                    <div className="tagItem" onClick={(obj) => this.ClickTag(obj.target, d.tag)}>{d.tag}</div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mystory = ({match}) => {
    const STORYID = match.params.id == undefined ? 1 : match.params.id;
    const CheckLogin = (() => {
        const token = cookie.load('token');

        axiosObj({
            method: "get",
            url: "api/auth/check",
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        }).then(response => {
            let parent = document.getElementsByClassName("boardList")[0];
            let newA = document.createElement("a");
            let newDiv = document.createElement("div");

            newA.setAttribute("href", "/mystory/write");
            newDiv.innerText = "글쓰기";
            newDiv.setAttribute("class", "list_write");
            newA.appendChild(newDiv);
            parent.appendChild(newA);

        }).catch(e => console.log(e));
    })();

    const ClickListAction = () => {
        let boardList = document.getElementById("BoardList");
        let listArea = document.getElementById("ListArea");

        let thisStyle = boardList.getAttribute("style");
        if(thisStyle == null || thisStyle == "display:flex") {
            boardList.setAttribute("style", "display:none");
            listArea.setAttribute("style", "width:30px");
        } else if(thisStyle == "display:none"){
            boardList.setAttribute("style", "display:flex");
            listArea.setAttribute("style", "width:100%");
        }
    }

    return (
        <div>
            <Nav/>
            <div className="contentArea">
                <div className="storyArea">
                    <div id="ListArea" className="ListArea">
                        <div id="BoardList" className="BoardList">
                            <div className="sch_area"><SearchBar placeholder="검색"/></div>
                            <BoardList id={STORYID}/>
                        </div>
                        <div id="ListAction" className="ListAction" onClick={ClickListAction}></div>
                    </div>
                    <div className="ViewArea">

                    </div>
                </div>
                <div className="Foot">
                </div>
            </div>
        </div>
    );
}

export default mystory;
