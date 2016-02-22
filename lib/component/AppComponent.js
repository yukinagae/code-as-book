"use strict";
import React from "react"
import EntryList from "./EntryList"
import Page from "./Page"

var fs = require('fs');
var path = require('path');

// see: http://stackoverflow.com/questions/11194287/convert-a-directory-structure-in-the-filesystem-to-json-with-node-js
function dirTree(filename) {
    var stats = fs.lstatSync(filename),
        info = {
            path: filename,
            name: path.basename(filename)
        };

    if (stats.isDirectory()) {
        info.type = "directory";
        info.content = fs.readdirSync(filename).map(function(child) {
            return dirTree(filename + '/' + child);
        });
    } else {
        // Assuming it's a file. In real life it could be a symlink or
        // something else!
        info.type = "file";
        info.content = "This is " + info.name;
    }

    return info;
}

export default class AppComponent extends React.Component {

    constructor(...args) {
        super(...args);
        var tree = dirTree('/Applications/node_workspace/code-as-book/sample');
        /*         var tree = dirTree('.'); */
        /* console.log(tree); */
        this.state = {
            entries: [ tree ],
            /* entries: [{type: 'file', name: 'foo.txt', content: "This is foo.txt"},
               {type: 'file', name: 'bar.txt', content: "This is bar.txt"},
               {type: 'directory', name: 'dir1', content: [
               {type: 'file', name: 'homu.txt', content: "This is homu.txt"},
               {type: 'directory', name: 'dir2', content: []}
               ] }
               ], */ // TODO dummy
            path: '/',
            filename: '',
            content: "console.log('Aloha world!');" // TODO dummy
        };
    }

    _onClickFile(props) {
        var self = this;
        var path = props.path;
        var filename = props.name;
        self.setState({path: path, filename: filename});
        fs.readFile(path, 'utf8', function(err, text) {
            self.setState({content: text});            
        });
    }

    render() {
            return <div className="l-content">
                        <div className="explorer">
                            <EntryList entries={this.state.entries} onClickFile={this._onClickFile.bind(this)} />
                            <Page name={this.state.filename} path={this.state.path} content={this.state.content} />
                        </div>
                    </div>
    }

}
