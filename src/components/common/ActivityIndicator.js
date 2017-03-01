import React, { Component } from 'react'
import './ActivityIndicator.css'

export default class ActivityIndicator extends Component {
  render() {
    let bars = [];
    const props = this.props;

    for (let i = 0; i < 12; i++) {
      let barStyle = {};
      barStyle.WebkitAnimationDelay = barStyle.animationDelay = (i - 12) / 10 + 's';

      barStyle.WebkitTransform = barStyle.transform = 'rotate(' + (i * 30) + 'deg) translate(146%)';

      bars.push(
        <div style={barStyle} className="spinner_bar" key={i} />
      );
    }

    return (
      <div className={this.props.mainClassName || 'activity-indicator-body'}>
        <div {...props} className={(props.className || '') + ' spinner'}>
          {bars}
        </div>
      </div>
    );
  }
}
