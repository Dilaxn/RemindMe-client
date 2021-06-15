import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SLUGS from 'resources/slugs';
import Login from '../screens/Login';
import Register from '../screens/Register';
import ForgetPassword from '../screens/ForgetPassword';
import ResetPassword from '../screens/ResetPassword';
import Activate from '../screens/Activate';

function PublicRoutes() {
    return (
        <Switch>
            {/*<Route path={SLUGS.login} render={() => <div>login</div>} />*/}
            {/*<Route path={SLUGS.signup} render={() => <div>signup</div>} />*/}
            {/*<Route path={SLUGS.forgotPassword} render={() => <div>forgotPassword</div>} />*/}
            {/*<Redirect to={SLUGS.login} />*/}
            <Route path='/login' exact render={props => <Login {...props} />} />
            <Route path='/register' exact render={props => <Register {...props} />} />
            <Route path='/users/password/forget' exact render={props => <ForgetPassword {...props} />} />
            <Route path='/users/password/reset/:token' exact render={props => <ResetPassword {...props} />} />
            <Route path='/users/activate/:token' exact render={props => <Activate {...props} />} />
            <Login/>
        </Switch>
    );
}

export default PublicRoutes;
