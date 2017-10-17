import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import PageTitle from '../PageTitle';

class ListVehicle extends Component {

  state = {
    showLoading: true
  }

  render() {
    return (
      <div className="content-wrapper">
        { this.state.showLoading ? (<div><div className="container-loading"></div><ReactLoading type="spin" color="#3c8dbc" className="loading-content" /></div>) : null }
        <PageTitle notice="This is notice" />
        <session className="content">
          <div>
            <div className="box">
                Example
            </div>
          </div>
        </session>
      </div>
    );
  };
};

export default ListVehicle;
