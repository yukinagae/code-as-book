"use strict";
import React from "react"
import EntryList from "./EntryList"

export default class AppComponent extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            entries: [{type: 'file', name: 'foo.txt'}, {type: 'directory', name: 'bar'}]
        };
    }

    render() {
            return <div className="l-content">
                <EntryList entries={this.state.entries} />
            </div>
    }

}
