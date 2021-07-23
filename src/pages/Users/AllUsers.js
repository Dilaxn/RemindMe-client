import React, { Component, useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import { useHistory } from 'react-router';
import { readAllTasks } from '../../context/TaskContext';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { FormControlLabel, Switch } from '@material-ui/core';
import axios from 'axios';
import { auth, readAllUsers } from '../../context/UserContext';
import { toast, ToastContainer } from 'react-toastify';
import { createUseStyles } from 'react-jss';

const columns = ["Name", "Company", "City", "State"];

const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
];

// const options = {
//     filterType: 'checkbox',
// };

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


export default function AllUsers() {
    let [userData, setUserData]  = useState([]);
    let [user,setUser]= useState([]);
    const detailss = [];

    let history = useHistory()
    const tokenString = localStorage.getItem('id_token');

    useEffect(() => {
        readAllUsers().then(r => {


            setUserData(r);
        })
        auth().then(r => {
            setUser(r)


        })
    }, []);


    const details = [];

    if (userData) {




        userData.map(r =>  {
            const data = [
                r.name,
                r.email,
                r._id

            ]

            detailss.push(data);

        });

    }

    const options = {
        filterType: "checkbox",
        selectableRowsOnClick: false,
        onRowsDelete: async (rowsDeleted, dataRows) => {
        },
        onRowClick: async (rowData) => {
            var answer = window.confirm("View Employee Information");
            if (answer) {
                let x = [rowData]
                let empId = [rowData]
                console.log(x);
                // alert(rowData[2])
                history.push(
                    {
                        pathname: 'prof',
                        state: { prop1: x }
                    }
                );
            } else {
                //some code
            }
        },

    };

    const columns = [
        {
            name: "Name",
            options: {
                display: true,
            }
        },
        {
            name: "Email",
            options: {
                display: true,
            }
        }
        ,
        {
            name: "Pic",
            options: {
                display: false,
            }
        }
    ];
    return (
        <div style={{ height: 400, width: '100%' }}>
            <ToastContainer />
            <MUIDataTable
                title={"Employee List"}
                data={detailss}
                columns={columns}
                options={options}

            />        </div>
    );
}
