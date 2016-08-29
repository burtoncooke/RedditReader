import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import LandingPage from './components/landing-page';
import App from './components/app';

export default class Routes extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={LandingPage} />
        </Route>
      </Router>
    );
  }
}
