import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Views
import Dashboard from './views/Dashboard';
import Documents from './views/Documents';
import Account from './views/Account';
import Organizations from './views/Organizations';
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
import NotFound from './views/NotFound';

import { isAuthenticated } from './auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
                <Redirect to={{ path: '/sign-in', state: { from: props.location } }} />
            )
    )} />
);

export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Redirect
                    exact
                    from="/"
                    to="/sign-in"
                />
                <PrivateRoute
                    component={Dashboard}
                    exact
                    path="/dashboard"
                />

                <PrivateRoute
                    component={Documents}
                    exact
                    path="/upload"
                />

                <PrivateRoute
                    component={Account}
                    exact
                    path="/account"
                />

                <PrivateRoute
                    component={Organizations}
                    exact
                    path="/organizations"
                />

                <Route
                    component={SignUp}
                    exact
                    path="/sign-up"
                />

                <Route
                    component={SignIn}
                    exact
                    path="/sign-in"
                />

                <Route
                    component={NotFound}
                    exact
                    path="/not-found"
                />

                <Redirect to="/not-found" />
            </Switch>
        );
    }
}
