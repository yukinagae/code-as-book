"use strict";
import React from "react"

class Line extends React.Component {

    render() {
        return <div className="line">
              <div className="box"><span className="line-number">{ this.props.index }</span></div>
              <div className="box"><p className="text">{ this.props.text }</p></div>
            </div>
    }
}

export default class Page extends React.Component {

    render() {
        return <div className="page">
          {
              this.props.content.split('\n').map(function(t, i) {
                  var index = i + 1;
                  // see: http://stackoverflow.com/questions/10474124/replacing-spaces-with-nbsp
                  var text = t.replace(/ /g, '\u00a0');
                  return <Line key={index} index={index} text={text} />
              })
          }
        </div>
    }
}
