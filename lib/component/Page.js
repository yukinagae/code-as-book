"use strict";
import React from "react"

export default class Page extends React.Component {

    render() {
        return <div className="page">
          {
              this.props.content.split('\n').map(function(t, i) {
                  var index = i + 1;
                  // see: http://stackoverflow.com/questions/10474124/replacing-spaces-with-nbsp
                  var text = t.replace(/ /g, '\u00a0');
                  console.log(text);
                  return (<div className="line">
                        <div className="box"><span className="line-number">{{ index }}</span></div>
                        <div className="box"><p className="text">{{ text }}</p></div>
                      </div>);
              })
          }
        </div>
    }
}
