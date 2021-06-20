import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SLUGS from 'resources/slugs';
import LoadingComponent from 'components/loading';
import Profile from './Profile';
import Login from '../screens/Login';

import { removeCookie, removeLocalStorage } from '../helpers/auth';
import { useHistory } from 'react-router';
// import AddRequest from '../pages/Request/AddRequest';
const AddReqComponent = lazy(() => import('../pages/Request/AddRequest'));
const PendingRequests = lazy(() => import('../pages/Request/PendingRequests'));
const Responses = lazy(() => import('../pages/Request/Responses'));
const AllUsers = lazy(() => import('../pages/Users/AllUsers'));
const ProfileMe = lazy(() => import('../pages/ProfileMe/Profile'));
const DashboardComponent = lazy(() => import('./dashboard'));
// const Login = lazy(() => import('../screens/Login'));



function PrivateRoutes() {
    return (
        <Suspense fallback={<LoadingComponent loading />}>
            <Switch>
                <Route exact path={SLUGS.dashboard} component={DashboardComponent} />
                <Route exact path={SLUGS.overviewTwo} render={AddReqComponent} />
                <Route exact path={SLUGS.overviewThree} render={() => <div>overviewThree</div>} />
                <Route exact path={SLUGS.overview} component={AddReqComponent} />
                <Route exact path={SLUGS.overviews} component={PendingRequests} />
                <Route exact path={SLUGS.overviewss} component={Responses} />

                <Route exact path={SLUGS.tickets} render={() => <div>tickets</div>} />
                <Route exact path={SLUGS.ideasTwo} render={() => <div>ideasTwo</div>} />
                <Route exact path={SLUGS.ideasThree} render={() => <div>ideasThree</div>} />
                <Route exact path={SLUGS.ideas} render={() => <div>ideas</div>} />
                <Route exact path={SLUGS.users} component={AllUsers} />
                <Route exact path={SLUGS.agents} component={ProfileMe} />
                <Route exact path={SLUGS.articles} render={() => <div>articles</div>} />
                <Route exact path={SLUGS.settings} render={() => <Login/>}  />
                <Route exact path={SLUGS.profile} render={() => <Profile/>} />
                <Route exact path={SLUGS.subscription} render={() => <div>settings</div>}  />
                <Redirect to={SLUGS.dashboard} />
            </Switch>
        </Suspense>
    );
}

export default PrivateRoutes;
