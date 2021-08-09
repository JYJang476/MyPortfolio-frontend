import React, { Component } from 'react';
import Button from '../Components/button';
import Nav from './nav';
import '../css/mystoryIO.css';
import axios from "axios";
import * as config from '../config';
import FroalaEditor from 'react-froala-wysiwyg';
import FroalaEditorImg from 'react-froala-wysiwyg/FroalaEditorImg';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import cookie from "react-cookies";

const axiosObj = axios.create({
    baseURL: config.HOST
});

class TagEditor extends Component {
    constructor() {
        super();
    }

    onTextChanged(e) {
        let AddTag = (text) => {
            let tagList = document.getElementsByClassName("TagList")[0];
            let newItem = document.createElement("div");
            let tagDelete = document.createElement("div");

            tagDelete.setAttribute("Class", "TagDelete");
            newItem.setAttribute("Class", "TagItem");

            newItem.innerText = text;
            tagDelete.innerText = "x";
            newItem.appendChild(tagDelete);
            tagList.appendChild(newItem);
        }

        let inputData = e.nativeEvent.data;
        let inputText = e.target.value;

        if(inputData == " "){
            let startSharp = inputText.indexOf("#");
            if(startSharp != -1) {
                let parseString = inputText.substring(startSharp + 1, inputText.length - 1);

                AddTag(parseString);
                e.target.value = "";
            }
        }
    }

    render() {
        return (
            <div className="TagBackground">
                <div className="TagList">
                </div>
                <input id="TagInput" type="text" onChange={this.onTextChanged} placeholder="태그를 입력해주세요"/>
            </div>
        );
    }
}

class Mystory_write extends Component {
    constructor() {
        super();

        this.handleModelChange = this.handleModelChange.bind(this);

        this.state = {
            model: "test"
        };
    }

    goWrite() {
        let title = document.getElementById("title");
        let tagClasses = document.getElementsByClassName("TagItem");
        let tagItems = [];

        for(let tag of tagClasses) {
            tagItems.push(tag.textContent.substring(0, tag.textContent.length - 1));
        }
        console.log(JSON.stringify({
            "tag": tagItems
        }));
        const token = cookie.load('token');

        axiosObj({
            method: "GET",
            url: "api/auth/check",
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        }).then(authRes => {
            axiosObj({
                method: "POST",
                url: "api/mystory/write",
                data: {
                    title: title.value,
                    content: this.state.model,
                    writer: authRes.data,
                    tag: JSON.stringify({
                        "tag": tagItems
                    })
                },
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${token}`
                },
            }).then((response) => {
                let reqData = response.data.data;

                window.location.href = "/mystory/view/" + reqData.id;
            });
        })
    }

    // editor setting
    config = {
        placeholderText: "내용을 입력해주세요"
    }

    handleModelChange(model) {
        this.setState({
            model: model
        });
    }

    render() {
        return (
            <div className="MainArea">
                <Nav/>
                <div className="ContentMainIO">
                  <div className="title">
                      <input id="title" type="text" placeholder="제목을 입력하세요"/>
                  </div>
                  <div id="editor" className="content">
                      <FroalaEditor base="https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.3.4" id="content" tag="textarea"
                                       config={this.config} onModelChange={this.handleModelChange}/>
                  </div>
                  <TagEditor></TagEditor>
                  <div className="foot">
                      <Button value="글쓰기" onClick={() => this.goWrite()}/>
                      <Button value="취소"/>
                  </div>
                </div>
            </div>
        );
    }
}

export default Mystory_write;
