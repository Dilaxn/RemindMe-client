import React, { useCallback, useContext, useEffect, useState } from 'react';
import { string } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Row } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';
import { SidebarContext } from 'hooks/useSidebar';
import SLUGS from 'resources/slugs';
import { IconBell, IconSearch } from 'assets/icons';
import DropdownComponent from 'components/dropdown';
import { removeCookie, removeLocalStorage } from '../../helpers/auth';
import { auth } from '../../context/UserContext';
import u from "../../context/UserContext"
import { toast } from 'react-toastify';
const useStyles = createUseStyles((theme) => ({
    avatar: {
        height: 35,
        width: 35,
        minWidth: 35,
        borderRadius: 50,
        marginLeft: 14,
        border: `1px solid ${theme.color.lightGrayishBlue2}`,
        '@media (max-width: 768px)': {
            marginLeft: 14
        }
    },
    container: {
        height: 40
    },
    name: {
        ...theme.typography.itemTitle,
        textAlign: 'right',
        '@media (max-width: 768px)': {
            display: 'none'
        }
    },
    separator: {
        borderLeft: `1px solid ${theme.color.lightGrayishBlue2}`,
        marginLeft: 32,
        marginRight: 32,
        height: 32,
        width: 2,
        '@media (max-width: 768px)': {
            marginLeft: 14,
            marginRight: 0
        }
    },
    title: {
        ...theme.typography.title,
        '@media (max-width: 1080px)': {
            marginLeft: 50
        },
        '@media (max-width: 468px)': {
            fontSize: 20
        }
    },
    iconStyles: {
        cursor: 'pointer',
        marginLeft: 25,
        '@media (max-width: 768px)': {
            marginLeft: 12
        }
    }
}));

function HeaderComponent({ term, onItemClick }) {


    const [imageHash, setImageHash]  = useState(Date.now());
    const { push } = useHistory();
    let [user, setUser]  = useState('');
    let [m, setM]  = useState('');
    // setUser(props.props);
    // setM(user.email.split(/@(.+)/)[0])
    let history = useHistory()
    //
    // const im = imageHash;
    useEffect(() => {
        // toast.success(`Hey ${props.props.name}, Welcome back!`);
        auth().then(r=>{
            setUser(r)
        })
        var today = new Date()
        var curHr = today.getHours()

        if (curHr < 12) {
            setM('good morning')
        } else if (curHr < 18) {
            setM('good afternoon')
        } else {
            setM('good evening')
        }
        setImageHash(Date.now)
    }, [onItemClick]);
    const { currentItem } = useContext(SidebarContext);
    const theme = useTheme();
    const classes = useStyles({ theme });

    let title;
    switch (true) {
        case currentItem === SLUGS.dashboard:
            title = 'Dashboard';
            break;
        case [SLUGS.overview, SLUGS.overviewTwo, SLUGS.overviewThree].includes(currentItem):
            title = 'Request Section';
            break;
        case currentItem === SLUGS.tickets:
            title = 'Tickets';
            break;
        case [SLUGS.ideas, SLUGS.ideasTwo, SLUGS.ideasThree].includes(currentItem):
            title = 'Ideas';
            break;
        case currentItem === SLUGS.contacts:
            title = 'Contacts';
            break;
        case currentItem === SLUGS.agents:
            title = 'Profile';
            break;
        case currentItem === SLUGS.articles:
            title = 'Articles';
            break;
        case currentItem === SLUGS.subscription:
            title = 'Subscription';
            break;
        case currentItem === SLUGS.settings:
            title = 'Settings';
            break;
        default:
            title = '';
    }

    function onSettingsClick() {
        push(SLUGS.settings);
    }

    return (
        <Row className={classes.container} vertical='center' horizontal='space-between'>
            <span className={classes.title}>{title}</span>
            <Row vertical='center'>
                <div className={classes.iconStyles}>
                    <IconSearch />
                </div>
                <div className={classes.iconStyles}>
                    <DropdownComponent
                        label={<IconBell />}
                        options={[
                            {
                                label: m+"  "+user.name,
                                onClick: () => console.log('Notification #2')
                            }
                        ]}
                        position={{
                            top: 42,
                            right: -14
                        }}
                    />
                </div>
                <div className={classes.separator}></div>
                <DropdownComponent
                    label={
                        <>
                            <span className={classes.name}>{user.name}</span>
                            <img
                                src={`${process.env.REACT_APP_API_URL}/${user.Id}/pic?${imageHash}`}
                                alt='a'
                                className={classes.avatar}
                            />
                        </>
                    }
                    options={[

                        {
                            label: 'Profile',
                            onClick: () => {
                                history.push('/agents')

                            }
                        },
                        {
                            label: 'Logout',
                            onClick: () => {
                                localStorage.removeItem("isLoggedIn");
                                removeCookie('token');
                                removeLocalStorage('user');
                                history.push('/login')
                                console.log('logout');
                            }
                        }
                    ]}
                    position={{
                        top: 52,
                        right: -6
                    }}
                />
            </Row>
        </Row>
    );
}

HeaderComponent.propTypes = {
    title: string
};

export default HeaderComponent;
