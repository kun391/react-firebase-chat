import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout } from '../../components/layout';
import { ListVehicle } from '../../components/vehicle';
import * as Actions from '../../actions';


class Vehicle extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    return (
      <Layout children={<ListVehicle auth={this.props.auth} actions={this.props.actions} />} />
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
)(Vehicle);
