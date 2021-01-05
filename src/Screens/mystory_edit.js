import React, { Component } from 'react';
import Button from '../Components/button';
import Nav from './nav';
import '../css/mystoryIO.css';

class Mystory_edit extends Component {
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
                        <Button value="글쓰기"/>
                        <Button value="취소"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Mystory_edit;
