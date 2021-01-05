import React, { Component } from 'react';
import '../css/ButtonCSS.css';


class Button extends Component {
    render() {
        return (
            <button className="ButtonStyle">{ this.props.value }</button>
        );
    }
}

export default Button;
