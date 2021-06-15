import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useWindowSize from 'hooks/useWindowSize';
import PrivateSection from 'routes/PrivateSection';
import PublicRoutes from 'routes/PublicRoutes';
import { isAuth } from '../helpers/auth';

function Routes() {
    const { pathname } = useLocation();
    // eslint-disable-next-line no-unused-vars
    const [width, height] = useWindowSize();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const isUserLoggedIn = localStorage.getItem('isLoggedIn');
    const isA= isAuth();
    console.log(isUserLoggedIn);
    return isA ? <PrivateSection /> : <PublicRoutes />;
}

export default Routes;
