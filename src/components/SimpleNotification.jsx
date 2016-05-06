import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';

export class SimpleNotification extends React.Component {
  removeNotifications() {
    setTimeout(() => {
      this.props.sendNotification('');
    }, this.props.duration);
  }

  render() {
    let style = {
      backgroundColor: '#313131',
      color: '#BBBBBB',
      width: '25%',
      textAlign: 'center',
      padding: '1em',
      position: 'absolute',
      zIndex: '1',
      left: '38%',
      top: '1em',
      border: '1px solid orange'
    };
    let notifications = this.props.notification.map((item, i) => {
      return (
        <div key={i} style={style} className="simple-notification">
          {item}
        </div>
      );
    });

    if (notifications.size > 0) {
      this.removeNotifications();
    }

    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="simple-notification"
          transitionEnterTimeout={this.props.fadeInTime}
          transitionLeaveTimeout={this.props.fadeOutTime}
        >
          {notifications}
        </ReactCSSTransitionGroup>
      </div>
      );
  }
}

function mapStateToProps() {
  return {};
}
export const SimpleNotificationContainer = connect(
  mapStateToProps,
  actionCreators
)(SimpleNotification);
