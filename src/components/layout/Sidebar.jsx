import React, { Component } from 'react';
import NavLink from './NavLink';
import AvatarDefault from 'admin-lte/dist/img/user2-160x160.jpg';

export default class Sidebar extends Component {

  render() {
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <div className="user-panel">
            <div className="pull-left image">
              <img src={AvatarDefault} className="img-circle" alt="User" />
            </div>
            <div className="pull-left info">
              <p>Admin</p>
              <a role="button"><i className="fa fa-circle text-success"></i> Online</a>
            </div>
          </div>
          <ul className="sidebar-menu" data-widget="tree">
            <li className="header">HEADER</li>
            <NavLink to="/contacts" activeClassName="active"><i className="fa fa-link"></i><span>Contacts</span></NavLink>
          </ul>
        </section>
      </aside>
    );
  };
};
