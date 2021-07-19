import React, { useEffect, useState } from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import MiniCardComponent from 'components/cards/MiniCardComponent';
import TodayTrendsComponent from './TodayTrendsComponent';
import UnresolvedTicketsComponent from './UnresolvedTicketsComponent';
import UnresolvedTicketComponent from './tasksC'
import { auth } from '../../context/UserContext';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { readAllTasks } from '../../context/TaskContext';

const useStyles = createUseStyles({
    cardsContainer: {
        marginRight: -30,
        marginTop: -30
    },
    cardRow: {
        marginTop: 30,
        '@media (max-width: 768px)': {
            marginTop: 0
        }
    },
    miniCardContainer: {
        flexGrow: 1,
        marginRight: 30,
        '@media (max-width: 768px)': {
            marginTop: 30,
            maxWidth: 'none'
        }
    },
    todayTrends: {
        marginTop: 30
    },
    lastRow: {
        marginTop: 30
    },
    unresolvedTickets: {
        marginRight: 30,
        '@media (max-width: 1024px)': {
            marginRight: 0
        }
    },
    tasks: {
        marginTop: 0,
        '@media (max-width: 1024px)': {
            marginTop: 30
        }
    }
});

function DashboardComponent() {
    let [user, setUser]  = useState('');
    let [taskData, setTaskData]  = useState([]);
    let [pendingReqs, setPendingReqs]  = useState('');
    let [respones, setRespones]  = useState('');
    let [pendingTasks, setPendingTasks]  = useState('');
    let [comTasks, setComTasks]  = useState('');
    // let [pen, setPen]  = useState([]);
const pen=[];
    const tokenString = localStorage.getItem('id_token');

    const details1 = [];
    const details2 = [];
    const details3 = [];
    const details4 = [];
    useEffect(() => {
        auth().then(r1 => {
            setUser(r1)
            readAllTasks().then(res => {
                setTaskData(res);
                let c = 0, c2 = 0, c3 = 0, c4 = 0;
                res.map(r => {

                    if (r.doneBy === '' && r.createdBy === r1.email) {

                        c = c + 1;
                    } else if (r.doneBy !== '' && r.createdBy === r1.email) {

                        c2 = c2 + 1
                    } else if (r.doneBy === r1.email) {

                        c3 = c3 + 1
                    } else if (r.doneBy === '') {
                        if (r.users.includes(r1.email)) {
                            pen.push(r.taskName)
                            c4 = c4 + 1
                        }
                    }
                });
                setPendingReqs(c)
                setRespones(c2)
                setPendingTasks(c4)
                setComTasks(c3)
            })

        })




    }, []);
    let history = useHistory()

    const classes = useStyles();
    return (
        <Column>
            <Row
                className={classes.cardsContainer}
                wrap
                flexGrow={1}
                horizontal='space-between'
                breakpoints={{ 768: 'column' }}
            >
                <Row
                    className={classes.cardRow}
                    wrap
                    flexGrow={1}
                    horizontal='space-between'
                    breakpoints={{ 384: 'column' }}
                >
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Pending Requests'
                        value={pendingReqs}
                    />

                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Responses'
                        value={respones}

                    />
                </Row>
                <Row
                    className={classes.cardRow}
                    wrap
                    flexGrow={1}
                    horizontal='space-between'
                    breakpoints={{ 384: 'column' }}
                >
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Pending Tasks'
                        value={pendingTasks}
                    />
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Completed Tasks'
                        value={comTasks}
                    />
                </Row>
            </Row>

            <Row
                horizontal='space-between'
                className={classes.lastRow}
                breakpoints={{ 1024: 'column' }}
            >
                <UnresolvedTicketsComponent containerStyles={classes.unresolvedTickets} />
                <UnresolvedTicketComponent containerStyles={classes.unresolvedTickets} />
            </Row>
        </Column>
    );
}

export default DashboardComponent;
