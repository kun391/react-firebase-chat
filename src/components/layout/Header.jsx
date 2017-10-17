import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './assets/header.css';
import $ from 'jquery/src/jquery.js';
import AvatarDefault from 'admin-lte/dist/img/user2-160x160.jpg';

export default class Header extends Component {
  static propTypes = {
    auth: PropTypes.object,
    actions: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  state = {
    miniSidebar: false
  }

  componentWillMount = () => {
    document.body.classList.add('skin-blue');
    document.body.classList.add('sidebar-mini');
  }

  componentDidMount() {
    if ($.AdminLTE.layout) {
      $.AdminLTE.layout.fix();
    }
  }

  handleToggleSidebar = () => {
    this.setState({miniSidebar: !this.state.miniSidebar}, () => {
      if (this.state.miniSidebar) {
        document.body.classList.add('sidebar-collapse');
      } else {
        document.body.classList.remove('sidebar-collapse');
      }
    });
  }

  handleLogout = async(e) => {
    e.preventDefault();
  }

  render() {
    return (
      <header className="main-header">
        <a role="button" className="logo">
          <span className="logo-mini"><b>L</b>uxe</span>
          <span className="logo-lg"><b>Admin</b>Luxe</span>
        </a>

        <nav className="navbar navbar-static-top">
          <a role="button" className="sidebar-toggle" onClick={this.handleToggleSidebar} data-toggle="push-menu">
            <span className="sr-only">Toggle navigation</span>
          </a>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li className="dropdown user user-menu">
                <a role="button" className="dropdown-toggle" data-toggle="dropdown">
                  <img src={AvatarDefault} className="user-image" alt="User" />
                  <span className="hidden-xs">Admin Luxe</span>
                </a>
                <ul className="dropdown-menu">
                  <li className="user-header">
                    <img src={AvatarDefault} className="img-circle" alt="User" />
                    <p>
                      Admin Luxe
                      <small>Member since Nov. 2012</small>
                    </p>
                  </li>
                  <li className="user-footer">
                    <div className="pull-right">
                      <a role="button" className="btn btn-default btn-flat" onClick={this.handleLogout} >Sign out</a>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  };
};
