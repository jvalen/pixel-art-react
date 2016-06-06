import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

export class SimpleNotification extends React.Component {
  removeNotifications() {
    setTimeout(() => {
      this.props.sendNotification('');
    }, this.props.duration);
  }

  render() {
    let notifications = this.props.notification.map((item, i) =>
      <div key={i} className="simple-notification">
        {item}
      </div>
    );

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
