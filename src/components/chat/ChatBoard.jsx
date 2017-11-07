import React, { Component } from 'react'
import PageTitle from '../PageTitle'
import ChatScreen from './ChatScreen'
import Contact from './Contact'
import PropTypes from 'prop-types'
import _ from 'lodash'
import "./assets/contact-list.css"


class ChatBoard extends Component {

  static propTypes = {
    contacts: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    targetUserId: PropTypes.string.isRequired,
    targetUser: PropTypes.object.isRequired,
    room_id: PropTypes.string.isRequired
  }

  static defaultProps = {
    contacts: [],
    targetUser: {}
  }

  componentWillMount = async () => {
    if (this.props.contacts.length === 0) {
      await this.props.actions.getContacts();
    }
    if (!this.props.targetUser) {
      this.props.targetUser = await _.find(this.props.contacts, (o) => { return o.id < this.props.targetUserId })
    }
  }

  render() {
    return (
      <div className="content-wrapper">
        <PageTitle title="Conversation" notice="Luxe" />
        <session className="content">
          <div>
            <div className="box">
              <div className="row">
                <div className="col-md-9">
                  <ChatScreen auth={this.props.auth} actions={this.props.actions} room_id={this.props.room_id} targetUserId={this.props.targetUserId} targetUser={this.props.targetUser}/>
                </div>
                <div className="col-md-3">
                  <Contact contacts={this.props.contacts} />
                </div>
              </div>
            </div>
          </div>
        </session>
      </div>
    );
  };
};

export default ChatBoard;
