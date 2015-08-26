"use strict";
import React from "react"

export default class Page extends React.Component {

    render() {
        return <div className="page">
            <p>{this.props.content}</p>
        </div>
    }
}
