import React, { Component } from 'react';
import Button from '../Components/button';
import Nav from './nav';
import '../css/mystoryIO.css';
import axios from "axios";

const axiosObj = axios.create({
    baseURL: "http://3.89.44.193/"
});

class Mystory_write extends Component {
    goWrite() {
        let title = document.getElementById("title");
        let content = document.getElementById("content");

        axiosObj.post("api/mystory/write/process", {
            header: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            title: title.value,
            content: content.value
        }).then((response) => {
            let reqData = response.data.data;

            window.location.href = "/mystory/" + reqData.id;
        });
    }

    render() {
        return (
            <div>
                <Nav/>
                <div className="ContentMain">
                  <div className="title">
                      <input id="title" type="text" placeholder="제목을 입력하세요"/>
                  </div>
                  <div className="content">
                      <textarea id="content" placeholder="내용을 입력해주세요"></textarea>
                  </div>
                  <div className="foot">
                      <Button value="글쓰기" onClick={this.goWrite()}/>
                      <Button value="취소"/>
                  </div>
                </div>
            </div>
        );
    }
}

export default Mystory_write;
