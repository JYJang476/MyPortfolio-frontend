import React, { Component } from 'react';
import '../css/ButtonCSS.css';

class Button extends Component {
    render() {
        return (
            <button className="ButtonStyle" onClick={this.props.onClick}>{ this.props.value }</button>
        );
    }
}

// class Modal extends Component {
//     render() {
//         return (
//             <div className="ModalBack">
//                 <div className="ModalContent"></div>
//                 <div className="ModalDone">확인</div>
//             </div>
//         );
//     }
// }

export default Button;
