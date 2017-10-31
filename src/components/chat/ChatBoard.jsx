import React, { Component } from 'react';
import PageTitle from '../PageTitle';
import ChatScreen from './ChatScreen';
import Contact from './Contact';
import PropTypes from 'prop-types';
import "./assets/contact-list.css";


class ChatBoard extends Component {

  static propTypes = {
    contacts: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    room_id: PropTypes.string.isRequired
  }

  static defaultProps = {
    contacts: []
  }

  componentWillMount = () => {
    if (this.props.contacts.length === 0) {
      this.props.actions.getContacts();
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
                  <ChatScreen auth={this.props.auth} actions={this.props.actions} room_id={this.props.room_id} />
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
