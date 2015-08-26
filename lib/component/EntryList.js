"use strict";
import React from "react"

export class EntryItem extends React.Component {

    render() {
        return <div>
            <h3>{this.props.name}</h3>
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

        return <div>
            {entries}
        </div>
    }
}
