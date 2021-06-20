import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { useHistory } from 'react-router-dom';
import SLUGS from 'resources/slugs';
import {
    IconAgents,
    IconArticles,
    IconContacts,
    IconIdeas,
    IconLogout,
    IconOverview,
    IconSettings,
    IconSubscription,
    IconTickets
} from 'assets/icons';
import {
    BsAward, BsAwardFill,
    BsCheckCircle,
    BsFileEarmarkPlus,
    BsFillBookmarkFill,
    BsFillCursorFill,
    BsListCheck, BsPersonBoundingBox
} from 'react-icons/bs';
import { convertSlugToUrl } from 'resources/utilities';
import LogoComponent from './LogoComponent';
import Menu from './MenuComponent';
import MenuItem from './MenuItemComponent';
import { removeCookie, removeLocalStorage } from '../../helpers/auth';
const useStyles = createUseStyles({
    separator: {
        borderTop: ({ theme }) => `1px solid ${theme.color.lightGrayishBlue}`,
        marginTop: 16,
        marginBottom: 16,
        opacity: 0.06
    }
});

function SidebarComponent() {
    const { push } = useHistory();
    const theme = useTheme();
    const classes = useStyles({ theme });
    const isMobile = window.innerWidth <= 1080;
    let history = useHistory()

    async function logout() {
        push(SLUGS.login);
    }

    function onClick(slug, parameters = {}) {
        push(convertSlugToUrl(slug, parameters));
    }

    return (
        <Menu isMobile={isMobile}>
            <div style={{ paddingTop: 30, paddingBottom: 30 }}>
                <LogoComponent />
            </div>
            <MenuItem
                id={SLUGS.dashboard}
                title='Dashboard'
                icon={IconSubscription}
                onClick={() => onClick(SLUGS.dashboard)}
            />
            <MenuItem
                id={SLUGS.overview}
                items={[SLUGS.overviews, SLUGS.overviewss]}
                title='Request for Help'
                icon={BsFillCursorFill}
            >
                <MenuItem
                    id={SLUGS.overview}
                    title='Add Request'
                    level={2}
                    icon={BsFileEarmarkPlus}
                    onClick={() => onClick(SLUGS.overview)}
                />
                <MenuItem
                    id={SLUGS.overviews}
                    title='Pending Requests'
                    level={2}
                    icon={BsFillBookmarkFill}
                    onClick={() => onClick(SLUGS.overviews)}
                />
                <MenuItem
                    id={SLUGS.overviewss}
                    title='Responses'
                    level={2}
                    icon={BsCheckCircle}
                    onClick={() => onClick(SLUGS.overviewss)}
                />
            </MenuItem>
            {/*<MenuItem*/}
            {/*    id={SLUGS.tickets}*/}
            {/*    title='Your Tasks'*/}
            {/*    icon={IconTickets}*/}
            {/*    onClick={() => onClick(SLUGS.tickets)}*/}
            {/*/>*/}
            <MenuItem
                id={SLUGS.ideas}
                items={[SLUGS.pending, SLUGS.completed]}
                title='Your Tasks'
                icon={BsListCheck}
            >
                <MenuItem
                    id={SLUGS.pending}
                    title='Pending Tasks'
                    level={2}
                    icon={BsAward}
                    onClick={() => onClick(SLUGS.pending)}
                />
                <MenuItem
                    id={SLUGS.completed}
                    title='Completed Tasks'
                    level={2}
                    icon={BsAwardFill}
                    onClick={() => onClick(SLUGS.completed)}
                />
                {/*<MenuItem*/}
                {/*    id={SLUGS.ideasThree}*/}
                {/*    title='Sub Item 3'*/}
                {/*    level={2}*/}
                {/*    icon={IconArticles}*/}
                {/*    onClick={() => onClick(SLUGS.ideasThree)}*/}
                {/*/>*/}
            </MenuItem>
            <MenuItem
                id={SLUGS.users}
                title='All Users'
                icon={IconContacts}
                onClick={() => onClick(SLUGS.users)}
            />
            <MenuItem
                id={SLUGS.agents}
                title='Profile'
                icon={BsPersonBoundingBox}
                onClick={() => onClick(SLUGS.agents)}
            />
            <MenuItem
                id={SLUGS.articles}
                title='Feedback'
                icon={IconArticles}
                onClick={() => onClick(SLUGS.articles)}
            />
            <MenuItem
                id={SLUGS.subscription}
                title='About Me'
                icon={IconSubscription}
                onClick={() => onClick(SLUGS.subscription)}
            />
            <div className={classes.separator}></div>


            <MenuItem id='logout' title='Logout' icon={IconLogout} onClick={() => {
                localStorage.removeItem("isLoggedIn");
                removeCookie('token');
                removeLocalStorage('user');
                history.push('/login')
                console.log('logout');
            }} />
        </Menu>
    );
}

export default SidebarComponent;
