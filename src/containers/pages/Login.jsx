import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LoginForm } from '../../components/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthActions from '../../actions';
import "./assets/login.css";

class Login extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    document.body.classList.add('hold-transition');
    document.body.classList.add('login-page');
  }

  render() {
    return (
      <div className="login-box">
        <div className="login-logo">
          <p><b>Admin</b>Luxe</p>
        </div>
        <div className="login-box-body">
          <p className="login-box-msg">Sign in to start your session</p>
          <LoginForm actions={this.props.actions} />
        </div>
      </div>
    );
  };
};


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
});

export default connect(
  mapDispatchToProps
)(Login);
