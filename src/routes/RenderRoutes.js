import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-router/Switch';
import Route from 'react-router/Route';
import withRouter from 'react-router/withRouter';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const RenderRoutes = ({ routes, auth, preload }) => {
  if (!routes) {
    return null;
  }

  routes.forEach((route) => {
    if (!route.requireLogin || !route.routes) {
      return;
    }
    const requireLogin = route.requireLogin;
    route.routes.forEach(route => route.requireLogin = requireLogin);
  });

  return (
    <Switch>
      {routes.map((route, i) => (
        <Route key={i} path={route.path} exact={route.exact} strict={route.strict} render={(props) => (
          <div>
            <route.component {...props} route={route}/>
            {
              route.requireLogin && !auth.user && (
                <Redirect to={{
                  pathname: route.requireLogin,
                  state: { from: route.path }
                }}/>
              )
            }
            {
              auth.user && (
                <Redirect to={{
                  pathname: route.home,
                  state: { from: route.path }
                }}/>
              )
            }
          </div>
        )}/>
      ))}
    </Switch>
  );
};

RenderRoutes.propTypes = {
  routes: PropTypes.array.isRequired,
  parent: PropTypes.array,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default withRouter(connect(
  mapStateToProps,
  null
)(RenderRoutes));
