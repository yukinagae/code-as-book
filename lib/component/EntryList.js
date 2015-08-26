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
            subFolders = this.state.subFolders.map((item, index) => {
                return (
                    <li key={index}><EntryItem name={item.name} /></li>
                    );
            });
        }

        var style = this.state.expanded ? {} : {display: 'none'};
        var icon = this.props.type === 'directory' ? 'fa fa-folder' : 'fa fa-file';
        var mark = this.state.expanded ? 'fa fa-angle-down' : 'fa fa-angle-right';

        return <div>
            <div onClick={this.onClick.bind(this)}>
                <i className={mark}></i>
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

        return <div className="explorer">
                <div className="folder-tree">
                {entries}
                </div>
        </div>
    }
}
