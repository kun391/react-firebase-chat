import React, { Component } from 'react';
import PageTitle from '../PageTitle';
import ChatScreen from './ChatScreen';
import Contact from './Contact';
import "./assets/contact-list.css";


class ChatBoard extends Component {

  state = {
    showLoading: true
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
                  <ChatScreen />
                </div>
                <div className="col-md-3">
                  <Contact />
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
