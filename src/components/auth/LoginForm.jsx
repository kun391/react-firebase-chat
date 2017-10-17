import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import LaddaButton, { XS, EXPAND_RIGHT } from 'react-ladda';
import "ladda/dist/ladda.min.css";
import "./assets/login.css";

class LoginForm extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    email: '',
    password: '',
    submitting: false
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    });
  }

  handleSubmit = async(e) => {
    e.preventDefault();

    if (this.state.submitting) {
      return;
    }

    await this.setState({ submitting: true });
    await setTimeout(() => {
      this.setState({ submitting: false });
    }, 5000);

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <div className="form-group has-feedback">
          <input type="text" name="email" autoFocus onChange={this.handleChange} className="form-control" placeholder="Username" />
          <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
        </div>
        <div className="form-group has-feedback">
          <input type="password" name="password" onChange={this.handleChange} className="form-control" placeholder="Password" />
          <span className="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div className="row">
          <div className="ladda-container pull-right">
            <LaddaButton
              loading={this.state.submitting}
              onClick={this.handleSubmit}
              data-color="#222"
              data-size={XS}
              data-style={EXPAND_RIGHT}
              data-spinner-size={15}
              data-spinner-color="#FFF"
              data-spinner-lines={15}
            >
            Sign In
            </LaddaButton>
          </div>
        </div>
        { this.state.login && <Redirect to="/" /> }
      </form>
    );
  };
};

export default LoginForm;
