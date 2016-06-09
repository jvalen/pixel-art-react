import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actions/actionCreators';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const SimpleNotification = (props) => {
  const removeNotifications = () => {
    setTimeout(() => {
      props.actions.sendNotification('');
    }, props.duration);
  };


  const notifications = props.notifications.map((item, i) =>
    <div key={i} className="simple-notification">
      {item}
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

const mapStateToProps = (state) => ({
  notifications: state.present.get('notifications')
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const SimpleNotificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SimpleNotification);
export default SimpleNotificationContainer;
