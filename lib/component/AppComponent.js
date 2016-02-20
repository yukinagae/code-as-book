"use strict";
import React from "react"
import EntryList from "./EntryList"
import Page from "./Page"

export default class AppComponent extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            entries: [{type: 'file', name: 'foo.txt', content: "This is foo.txt"},
                      {type: 'file', name: 'bar.txt', content: "This is bar.txt"},
                      {type: 'directory', name: 'dir1', content: [
                          {type: 'file', name: 'homu.txt', content: "This is homu.txt"},
                          { type: 'directory', name: 'dir2', content: [] }
                      ] }
                      ], // TODO dummy
            content: "console.log('Aloha world!');" // TODO dummy
        };
    }

    _onClickFile(content) {
        this.setState({content: content});
    }

    render() {
            return <div className="l-content">
                        <div className="explorer">
                            <EntryList entries={this.state.entries} onClickFile={this._onClickFile.bind(this)} />
                            <Page content={this.state.content} />
                        </div>
                    </div>
    }

}
