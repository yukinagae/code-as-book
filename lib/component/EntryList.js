"use strict";
import React from "react"

export class EntryItem extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            expanded: false,
            enumerated: false
        };
    }

    _onClick() {

        if(this.props.type === 'file') {
            this.props.onClickFile(this.props.path);
            return;
        }

        if(this.state.enumerated) {
            this.setState({ expanded: !this.state.expanded });
        } else {
            this.setState({ enumerated: true });
            var component = this;
            if(component.props.content.length > 0) {
                component.setState({ subFolders: component.props.content,
                                     expanded: !component.state.expanded });                
            } else {
                //
            }
        }
    }

    render() {

        var subFolders  = null;
        if(this.state.subFolders) {
            subFolders = this.state.subFolders.map((entry, index) => {
                return (
                    <li key={index}><EntryItem name={entry.name} type={entry.type} path={entry.path} content={entry.content} onClickFile={this.props.onClickFile} /></li>
                    );
            });
        }

        var style = this.state.expanded ? {} : {display: 'none'};
        var icon = this.props.type === 'directory' ? 'fa fa-folder' : 'fa fa-file';
        if(this.props.type === 'directory') {
            if(this.state.expanded) {
                icon = "fa fa-folder-open";
            }
        }

        return <div className="entry">
            <div onClick={this._onClick.bind(this)}>
                <i className={icon}></i>
                <span>&nbsp;{this.props.name}</span>
            </div>
            <ul style={style}>
                {subFolders}
            </ul>
        </div>
    }
}

export default class EntryList extends React.Component {
    static get propTypes() {
        return {
            entries: React.PropTypes.array,
            onClickFile: React.PropTypes.func
        }
    }

    _onClickFile(path) {
        this.props.onClickFile(path);
    }

    render() {
        var entries = this.props.entries.map((entry, index) => {
            return <EntryItem key={index} name={entry.name} type={entry.type} path={entry.path} content={entry.content} onClickFile={this._onClickFile.bind(this)} />
        });

        return <div className="folder-tree">
                {entries}
                </div>
    }
}
