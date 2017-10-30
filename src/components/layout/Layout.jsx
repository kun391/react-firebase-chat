import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Sidebar from './Sidebar';

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <div className="admin-block">
        <Header auth={this.props.children.props.auth} actions={this.props.children.props.actions} />
        <Sidebar />
        { this.props.children }
      </div>
    );
  };
};
