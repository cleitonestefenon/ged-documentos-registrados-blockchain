import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Views
import Dashboard from './views/Dashboard';
import ProductList from './views/ProductList';
import DocumentsRegistration from './views/DocumentsRegistration';
import Typography from './views/Typography';
import Icons from './views/DocumentsRegistration/components/DocumentUpload';
import Account from './views/Account';
import Document from './views/Documents';
import Settings from './views/Settings';
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
import UnderDevelopment from './views/UnderDevelopment';
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
                    component={ProductList}
                    exact
                    path="/products"
                />

                <PrivateRoute
                    component={DocumentsRegistration}
                    exact
                    path="/upload"
                />

                <PrivateRoute
                    component={Typography}
                    exact
                    path="/typography"
                />
                <PrivateRoute
                    component={Icons}
                    exact
                    path="/icons"
                />
                <PrivateRoute
                    component={Account}
                    exact
                    path="/account"
                />
                <PrivateRoute
                    component={Document}
                    exact
                    path="/documents"
                />
                <PrivateRoute
                    component={Settings}
                    exact
                    path="/settings"
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
                    component={UnderDevelopment}
                    exact
                    path="/under-development"
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
