import React, { Component } from 'react';
import '../css/ButtonCSS.css';


class Button extends Component {
    render() {
        return (
            <button className="ButtonStyle" onClick={this.props.onClick}>{ this.props.value }</button>
        );
    }
}

export default Button;
