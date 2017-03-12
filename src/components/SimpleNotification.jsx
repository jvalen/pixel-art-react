import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as actionCreators from '../store/actions/actionCreators';

const SimpleNotification = (props) => {
  const removeNotifications = () => {
    setTimeout(() => {
      props.actions.sendNotification('');
    }, props.duration);
  };


  const notifications = props.notifications.map(item =>
    <div key={item.id} className="simple-notification">
      {item.message}
    </div>
  );

  if (notifications.size > 0) {
    removeNotifications();
  }

  return (
    <div>
      <ReactCSSTransitionGroup
        transitionName="simple-notification"
        transitionEnterTimeout={props.fadeInTime}
        transitionLeaveTimeout={props.fadeOutTime}
      >
        {notifications}
      </ReactCSSTransitionGroup>
    </div>
  );
};

const mapStateToProps = state => ({
  notifications: state.present.get('notifications')
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const SimpleNotificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SimpleNotification);
export default SimpleNotificationContainer;
