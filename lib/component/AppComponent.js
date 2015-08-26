"use strict";
import React from "react"
import EntryList from "./EntryList"
import Page from "./Page"

export default class AppComponent extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            entries: [{type: 'file', name: 'foo.txt'}, {type: 'directory', name: 'bar'}] // TODO dummy
        };
    }

    render() {
            return <div className="l-content">
                        <div className="explorer">
                            <EntryList entries={this.state.entries} />
                            <Page />
                        </div>
                    </div>
    }

}
