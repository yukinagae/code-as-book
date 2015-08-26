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

    onClick() {

        if(this.props.type === 'file') {
            return; // TODO open file
        }

        if(this.state.enumerated) {
            this.setState({ expanded: !this.state.expanded });
        } else {
            this.setState({ enumerated: true });
            var component = this;
            var subFolders = [{type: 'directory', name: 'subFolder'}]; // TODO dummy
            component.setState({ subFolders: subFolders,
                                 expanded: !component.state.expanded });
        }
    }

    render() {

        var subFolders  = null;
        if(this.state.subFolders) {
            subFolders = this.state.subFolders.map((entry, index) => {
                return (
                    <li key={index}><EntryItem {...entry} /></li>
                    );
            });
        }

        var style = this.state.expanded ? {} : {display: 'none'};
        var icon = this.props.type === 'directory' ? 'fa fa-folder' : 'fa fa-file';
        var mark = null;
        if(this.props.type === 'directory') {
            if(this.state.expanded) {
                mark = (<i className="fa fa-angle-down"></i>);
            } else {
                mark = (<i className="fa fa-angle-right"></i>);
            }
        }

        return <div>
            <div onClick={this.onClick.bind(this)}>
                {mark}
                <i className={icon}></i>
                <span> {this.props.name}</span>
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
            entries: React.PropTypes.array
        }
    }

    render() {
        var entries = this.props.entries.map((entry, index) => {
            return <EntryItem key={index} {...entry} />
        });

        return <div className="folder-tree">
                {entries}
                </div>
    }
}
