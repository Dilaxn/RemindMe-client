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
                r.avatar

            ]

            detailss.push(data);

        });

    }

    const options = {
        // selectableRowsOnClick: false,
        selectableRows: false,


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
                display: true,
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
