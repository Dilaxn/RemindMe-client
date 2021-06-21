import React, { useEffect, useState } from 'react';
import { Row } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';
import CardComponent from 'components/cards/CardComponent';
import { readAllTasks } from '../../context/TaskContext';
import { auth } from '../../context/UserContext';

const useStyles = createUseStyles((theme) => ({
    itemTitle: {
        ...theme.typography.itemTitle,
        color: theme.color.veryDarkGrayishBlue
    },
    itemValue: {
        color: theme.color.grayishBlue2
    }
}));

function UnresolvedTicketsComponent({ containerStyles }) {
    const theme = useTheme();
    const classes = useStyles({ theme });

    function renderStat(title, value) {
        return (
            <Row horizontal='space-between' vertical='center'>
                <span className={classes.itemTitle}>{title}</span>
                <span className={[classes.itemTitle, classes.itemValue].join(' ')}>{value}</span>
            </Row>
        );
    }
    let [taskData, setTaskData]  = useState([]);
    let [user,setUser]= useState([]);
    const detailss = [];


    useEffect(() => {
        readAllTasks().then(r => {
            console.log(r);
            setTaskData(r);
        })
        auth().then(r => {
            setUser(r)
            console.log(r);
        })
    }, []);

    if (taskData) {
        taskData.map(r => {if(r.doneBy!=='' && r.createdBy=== user.email) {
            const data = [
                r.taskName+":- ",
                r.doneBy
            ]

            detailss.push(renderStat(data));
        }
        });

    }
    return (
        <CardComponent
            containerStyles={containerStyles}
            title='Responses'
            link='View details'
            subtitle='Name:'
            subtitleTwo='DoneBy'
            items={detailss}
        />
    );
}

export default UnresolvedTicketsComponent;
