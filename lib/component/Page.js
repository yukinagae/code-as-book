"use strict";
import React from "react"

export default class Page extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            content: "console.log('Aloha world!');" // TODO dummy
        };
    }

    render() {
        return <div className="page">
            <p>{this.state.content}</p>
        </div>
    }
}
