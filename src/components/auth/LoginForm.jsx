import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import LaddaButton, { XS, EXPAND_RIGHT } from 'react-ladda';
import Fire from '../../libraries/Fire'
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
    submitting: false,
    logged: false

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

    this.props.actions.authLogin({email: this.state.email, password: this.state.password}).then(async (res) => {
      if (res.payload && res.payload.status === 200) {
        await Fire.auth().signInWithCustomToken(res.payload.data.data.accessToken).then((res) => {
          this.props.actions.setToken(res.ra.Ja);
        }).catch(function (error) {
          this.setState({ submitting: false });
        });
        await this.props.actions.userLogged(res.payload.data.data.id);
        this.setState({ logged: true, submitting: false });

      } else {
        this.setState({ submitting: false });
      }
    })
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
        { this.state.logged && <Redirect to="/" /> }
      </form>
    );
  };
};

export default LoginForm;
