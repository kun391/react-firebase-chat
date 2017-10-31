import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Contact extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    attributes: PropTypes.array
  }

  render() {
    return (
      <div className="box box-success">
        <div className="box-header with-border">
          <h3 className="box-title">Contacts</h3>
        </div>
        <ul className="contacts-list">
          {
            this.props.contacts && this.props.contacts.map((contact, i) =>
              (<li key={ i } >
              <Link to={`/chat/${contact.uid}`}>
                <div className="contacts-list-info">
                  <span className="contacts-list-name">
                      <small className="contacts-list-date pull-left">{contact.full_name}</small>
                  </span>
                </div>
              </Link>
            </li>)
            )
          }
          
        </ul>
      </div>
    );
  };
};

export default Contact;
