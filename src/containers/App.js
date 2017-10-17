import React from 'react';
import PropTypes from 'prop-types';
import { RenderRoutes } from '../routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'admin-lte/dist/css/AdminLTE.min.css';
import 'admin-lte/dist/css/skins/_all-skins.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'admin-lte/dist/js/app.min.js';
import 'jquery-sparkline';
import './pages/assets/app.css';

const App = ({route}) => (
  <RenderRoutes routes={route.routes} />
);

App.propTypes = {
  route: PropTypes.object.isRequired
};

export default App;
