import React, { Component } from 'react';
import PageTitle from '../PageTitle';
import Contact from './Contact';
import PropTypes from 'prop-types';
import "./assets/contact-list.css";


class ListContact extends Component {

  static propTypes = {
    contacts: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  static defaultProps = {
    contacts: []
  }

  componentWillMount = () => {
    this.props.actions.getContacts();
  }

  render() {
    return (
      <div className="content-wrapper">
        <PageTitle title="Conversation" notice="Luxe" />
        <session className="content">
          <div>
            <div className="box">
              <Contact contacts={this.props.contacts}/>
            </div>
          </div>
        </session>
      </div>
    );
  };
};

export default ListContact;
