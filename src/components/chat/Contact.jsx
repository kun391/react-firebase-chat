import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Contact extends Component {
  static propTypes = {
    vehicle: PropTypes.object,
    attributes: PropTypes.array
  }

  render() {
    return (
      <div className="box box-success">
        <div className="box-header with-border">
          <h3 className="box-title">Contacts</h3>
        </div>
        <ul className="contacts-list">
          <li>
            <Link to={'/chat/1'}>
              <div className="contacts-list-info">
                <span className="contacts-list-name">
                  <small className="contacts-list-date pull-left">Alexander Pierce</small>
                </span>
              </div>
            </Link>
          </li>
          <li>
            <Link to={'/chat/2'}>
              <div className="contacts-list-info">
                <span className="contacts-list-name">
                  <small className="contacts-list-date pull-left">Pierce</small>
                </span>
              </div>
            </Link>
          </li>
          <li>
            <Link to={'/chat/3'}>
              <div className="contacts-list-info">
                <span className="contacts-list-name">
                  <small className="contacts-list-date pull-left">Alexander</small>
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    );
  };
};

export default Contact;
