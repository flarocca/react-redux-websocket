import React, { Component } from 'react';

export default class Send extends Component {
    render() {
        return (
            <svg className={this.props.className} fill={this.props.innerColor} viewBox="0 0 1792 1792">
                <path d="M1764 11q33 24 27 64l-256 1536q-5 29-32 45-14 8-31 8-11 0-24-5l-527-215-298 327q-18 21-47 21-14 0-23-4-19-7-30-23.5t-11-36.5v-452l-472-193q-37-14-40-55-3-39 32-59l1664-960q35-21 68 2zm-342 1499l221-1323-1434 827 336 137 863-639-478 797z" />
            </svg>
        );
    }
}