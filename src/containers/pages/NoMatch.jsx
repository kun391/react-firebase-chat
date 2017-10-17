import React from 'react';

const NoMatch = () => (
  <div>
    <section className="content">
      <div className="error-page">
        <h2 className="headline text-yellow"> 404</h2>
        <div className="error-content">
          <h3><i className="fa fa-warning text-yellow"></i> Oops! Page not found.</h3>
            We could not find the page you were looking for.
            Meanwhile, you may <a href="/">return to dashboard</a> or try using the search form.
        </div>
      </div>
    </section>
  </div>
);

export default NoMatch;
