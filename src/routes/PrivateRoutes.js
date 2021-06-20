import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SLUGS from 'resources/slugs';
import LoadingComponent from 'components/loading';
import Profile from './Profile';
// import AddRequest from '../pages/Request/AddRequest';
const AddReqComponent = lazy(() => import('../pages/Request/AddRequest'));
const PendingRequests = lazy(() => import('../pages/Request/PendingRequests'));
const Responses = lazy(() => import('../pages/Request/Responses'));

const DashboardComponent = lazy(() => import('./dashboard'));

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
                <Route exact path={SLUGS.contacts} render={() => <div>contacts</div>} />
                <Route exact path={SLUGS.agents} render={() => <div>agents</div>} />
                <Route exact path={SLUGS.articles} render={() => <div>articles</div>} />
                <Route exact path={SLUGS.settings} render={() => <div>settings</div>} />
                <Route exact path={SLUGS.profile} render={() => <Profile/>} />
                <Route exact path={SLUGS.subscription} render={() => <div>subscription</div>} />
                <Redirect to={SLUGS.dashboard} />
            </Switch>
        </Suspense>
    );
}

export default PrivateRoutes;
