"use strict";
import React from "react"

export default class Page extends React.Component {

    render() {
        return <div className="page">
          <div className="line">
            <div className="box"><span>1</span></div>
            <div className="box"><p>{this.props.content}</p></div>
          </div>
        </div>
    }
}
