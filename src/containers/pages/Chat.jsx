import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout } from '../../components/layout';
import { ChatBoard } from '../../components/chat';
import _ from 'lodash'
import * as Actions from '../../actions';


class Chat extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  state = {
    targetUser: {},
    contacts: []
  }

  render () {
    const userId = this.props.auth.user ? this.props.auth.user.id : null
    const roomId = this.getRoomId(this.props.match.params.id, userId)
    const id = parseInt(this.props.match.params.id, 10)
    const targetUser = _.find(this.props.contacts, { 'id': id })

    return (
      <Layout children={<ChatBoard targetUser={targetUser} targetUserId={this.props.match.params.id} room_id={roomId} auth={this.props.auth} actions={this.props.actions} contacts={this.props.contacts}/>} />
    );
  };

  getRoomId = (aid, bid) => {
    if (aid > bid) {
      return `${aid}-${bid}` 
    }
    return `${bid}-${aid}`
  }
};

const mapStateToProps = state => ({
  auth: {
    ...state.auth
  },
  contacts: state.users.contacts
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
