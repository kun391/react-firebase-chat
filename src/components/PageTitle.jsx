import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PageTitle extends Component {

  static propTypes = {
    title: PropTypes.string,
    notice: PropTypes.string,
    className: PropTypes.string
  };

  static defaultProps = {
    title: 'Title'
  }

  render() {
    return (
      <section className={`content-header ${this.props.className}`}>
        <h1>
          {this.props.title}
          {
            this.props.notice && <small>{this.props.notice}</small>
          }
        </h1>
      </section>
    );
  };
};
