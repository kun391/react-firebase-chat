import React, { Component } from 'react';
import PropTypes from 'prop-types';

class VehicleItem extends Component {
  static propTypes = {
    vehicle: PropTypes.object.isRequired,
    attributes: PropTypes.array.isRequired
  }

  render() {
    return (
      <tr role="row" className="odd">
        {this.props.attributes.map((attr, i) => {
           return <td key={i} width="10px" rowSpan="1" colSpan="1">{this.props.vehicle[attr] ? this.props.vehicle[attr].toString() : 'NULL'}</td>
        })}
      </tr>
    );
  };
};

export default VehicleItem;
