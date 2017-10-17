import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout } from '../../components/layout';
import { ChatBoard } from '../../components/chat';
import * as Actions from '../../actions';


class Chat extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    return (
      <Layout children={<ChatBoard auth={this.props.auth} actions={this.props.actions} />} />
    );
  };
};

const mapStateToProps = state => ({
  auth: {
    ...state.auth
  }
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
