import React, { Component, useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import { useHistory } from 'react-router';
import { readAllTasks } from '../../context/TaskContext';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { FormControlLabel, Switch } from '@material-ui/core';
import axios from 'axios';
import { auth } from '../../context/UserContext';
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



export default function Responses() {
    let [taskData, setTaskData]  = useState([]);
    let [user,setUser]= useState([]);
    const detailss = [];

    let history = useHistory()
    const tokenString = localStorage.getItem('id_token');

    useEffect(() => {
        readAllTasks().then(r => {


            setTaskData(r);
        })
        auth().then(r => {
            setUser(r)


        })
    }, []);


    const details = [];

    if (taskData) {




        taskData.map(r => {if(r.doneBy!='' && r.createdBy== user.email) {
            const data = [
                r.taskName,
                r.taskDescription,
                r.doneBy,
                r.users.length,
                r.comments,
                r._id
            ]

            detailss.push(data);
        }
        });

    }


    const deleteRows = (RowsDeleted, data) => {
        const ids = RowsDeleted.data.map(d => d.dataIndex);
        detailss.push(data);
        // const idsToDeleted = ids.map(d => shells[d][9]);   //This is possibly this, ids.map(d => data[d][9])

 //Now you will get data
        // axios({
        //     method: 'post',
        //     url: 'http://localhost:5000/eliminado',
        //     data: RowsDeleted,
        // });
    }
    const options = {
        // selectableRowsOnClick: false,
        selectableRows: false,
        // onRowsDelete: deleteRows,
        // customBodyRender: (value, tableMeta, updateValue) => {
        //     console.log(value);
        //     return (
        //         <button onClick={() => console.log(value, tableMeta) }>
        //             Edit
        //         </button>
        //     )
        // }

        // onRowClick: async (rowData) => {
        //     var answer = window.confirm("Delete the data");
        //     if (answer) {
        //         const tokenString = getToken()
        //         let x = [rowData[2]]
        //         let job_titles = [x[0]]
        //         console.log(JSON.stringify({job_titles}))
        //         return axios.delete('/job_titles', {
        //             headers: {
        //                 'Authorization': `Bearer ${tokenString}`,
        //                 'Content-Type': 'application/json',
        //             },
        //             data: JSON.stringify({job_titles})
        //         })
        //             .then(function (response) {
        //                 readAllJobs().then(r => setJobData(r))
        //             })
        //     } else {
        //         //some code
        //     }
        // },

    };

    const columns = [
        {
            name: "Name",
            options: {
                display: true,
            }
        },
        {
            name: "Description",
            options: {
                display: true,
            }
        },
        {
            name: "Done By",
            options: {
                display: true,
            }
        },
        {
            name: "No of Helpers",
            options: {
                display: true,
            }
        },
        {
            name: "Comments",
            options: {
                display: true,
            }
        },
        {
            name: "Remove",
            options: {
                filter: true,
                customBodyRender: (value, detailss, details) => {

                    return (
                        <Button
                            variant="contained" color="secondary"
                            onClick={(e) => {
                                // console.log(value);
                                // console.log(detailss.currentTableData[0].data[6]);
                                // return  details = detailss.currentTableData.filter(e => e.data[6] !== '60ce3ac10e48db102b60b455');
                                // console.log(details);

                                let tasks = [value]

                                return axios.delete(`${process.env.REACT_APP_API_URL}/task/full`, {
                                    headers: {
                                        'Authorization': `${user.Id}`,
                                        'Content-Type': 'application/json',
                                    },
                                    data: JSON.stringify({ tasks })
                                })
                                    .then(function(response) {
                                        toast.success(`Task Successfully Deleted!`);
                                        readAllTasks().then(r => {


                                            setTaskData(r);
                                        })


                                    })

                            }}>Delete</Button>
                    )
                    //         // <FormControlLabel
                    //         //     label={value ? "Yes" : "No"}
                    //         //     value={value ? "Yes" : "No"}
                    //         //     control={
                    //         //         <Switch color="primary" checked={value} value={value ? "Yes" : "No"} />
                    //         //     }
                    //         //     onChange={event => {
                    //         //         console.log(event.target.value);
                    //         //         // updateValue(event.target.value === "Yes" ? false : true);
                    //         //     }}
                    //         // />
                    //     );
                    //
                    // }

                    // sort: false,
                    // empty: true,
                    // customBodyRender: (value, tableMeta, updateValue) => {
                    //     return (
                    //         <button onClick={() => {
                    //             console.log(value);
                    //             let x = [value]
                    //
                    //             console.log(JSON.stringify(x))
                    //             return axios.delete('/task', {
                    //
                    //                 data: JSON.stringify(x)
                    //             })
                    //                 .then(function (response) {
                    //                     console.log(response);
                    //                 })
                    //         }}>
                    //             Delete
                    //         </button>
                    //     );
                    // }
                }
            }
        },
        {
            name: "",
            options: {
                display: 'excluded',
                onRowClick: (rowData, rowState) => {


                },
            }
        },
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
