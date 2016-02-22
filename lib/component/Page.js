"use strict";
import React from "react"

import ReactTooltip from "react-tooltip"
import ReactModal from "react-modal"
var sha1 = require('sha1');

export class Comment extends React.Component {

    render() {
        var comment;
        if(this.props.comment != "") {
            return <ReactTooltip id={ this.props.id } type='info' effect='solid' place='left'>
                     <p>{ this.props.comment }</p>
                   </ReactTooltip>
        }
        return null;
    }

}

var customStyles = {
    overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'transparent'
    },
    content : {
        top                   : '25%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        backgroundColor       : '#f4f2ed'
    }
};

export class Line extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            comment: '',
            modalIsOpen: false
        };
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    onChangeText(e) {
        this.setState({comment: e.target.value});
    }

    render() {
        var comment_mark;
        if(this.state.comment != '') {
            comment_mark = (<i className="fa fa-comment-o" style={{ color: 'white' }}></i>)
        } else {
            comment_mark = (<i className="fa fa-comment-o" style={{ color: 'white', visibility: 'hidden' }}></i>)
        }
        return <div className="line" onClick={this.openModal.bind(this)} data-tip data-for={ this.props.id }>
               <Comment id={this.props.id} comment={this.state.comment} />
              <div className="box">{ comment_mark }<span className="line-number">{ this.props.index }</span></div>
              <div className="box"><p className="text">{ this.props.text }</p></div>
              <ReactModal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal.bind(this)} style={customStyles}>
                <h3>Comment</h3>
                <i className="fa fa-times close" onClick={this.closeModal.bind(this)}></i>
                <textarea style={{ fontSize: '16px' }} cols='20' rows='4' value={this.state.comment} onChange={this.onChangeText.bind(this)}/>
                <br/>
                <button onClick={this.closeModal.bind(this)}>Comment</button>
              </ReactModal>
            </div>
    }
}

function removeLastIfNothing(list) {
    var last = list[list.length-1];
    if(last == "") {
        list.splice(-1, 1);
    }
    return list;
}

export default class Page extends React.Component {

    render() {
        var self = this;
        return <div className="page">
          {
              removeLastIfNothing(this.props.content.split('\n')).map(function(t, i) {
                  var index = i + 1;
                  // see: http://stackoverflow.com/questions/10474124/replacing-spaces-with-nbsp
                  var text = t.replace(/ /g, '\u00a0');
                  var seed = self.props.path + index;
                  var key = sha1(seed);
                  return <Line key={key} id={key} index={index} path={self.props.path} text={text} />
              })
          }
        </div>
    }
}
