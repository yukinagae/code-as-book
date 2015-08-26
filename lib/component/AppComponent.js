"use strict";
import React from "react"
import EntryList from "./EntryList"

export default class AppComponent extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            entries: [{ name: 'foo'}]
        };
    }

    render() {
            return <div>
                <EntryList entries={this.state.entries} />
            </div>
    }

}
