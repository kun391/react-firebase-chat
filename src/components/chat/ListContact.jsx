import React, { Component } from 'react';
import PageTitle from '../PageTitle';
import Contact from './Contact';
import "./assets/contact-list.css";


class ListContact extends Component {

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
              <Contact />
            </div>
          </div>
        </session>
      </div>
    );
  };
};

export default ListContact;
