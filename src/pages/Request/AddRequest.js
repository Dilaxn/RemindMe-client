import {
    Checkbox,
    FormControl, InputLabel, ListItemText, Select,
    TextField, useTheme
} from '@material-ui/core';
import React, {useEffect, useState} from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import axios from "axios";
import { readAllUsers } from '../../context/UserContext';
import { classes } from 'istanbul-lib-coverage';
import { toast, ToastContainer } from 'react-toastify';

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function AddRequest() {

    let [taskName, setTaskName]   = useState('');
    let [taskDescription, setTaskDescription] = useState('');
    let [comments, setComments]   = useState('');

    let [sel, setSel]  = useState([]);

    let [users, setUsers]  = useState([]);
    const tokenString = localStorage.getItem('id_token');

    useEffect(() => {

        readAllUsers().then(r=> {
            console.log(r);
            setUsers(r);
        })
    }, []);

    const theme = useTheme();
    const handleChange = (event) => {
        setSel(event.target.value);
    };
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }));

    if(1) {
        return (
            <div>
                <ToastContainer />
                <div>
                    <fieldset>
                        {/* eslint-disable-next-line react/jsx-no-undef */}


                        {/* eslint-disable-next-line react/jsx-no-undef */}
                        <h2 style={{
                            margin: 'auto',
                            width: "70%",
                            textAlign: 'center',
                            marginTop: '30px',
                            marginBottom: '-30px'
                        }}>Add Request</h2>


                            <Grid container style={{marginTop: "20px"}}>
                                <FormControl style={{margin: 'auto', width: "80%", align: 'center', marginTop: '40px'}}>
                                </FormControl>
                                <TextField
                                    id="outlined-select-currency-native"
                                    label="Task Name"
                                    value={taskName}
                                    onChange={e => setTaskName(e.target.value)}
                                    helperText="Input task name"
                                    variant="outlined"
                                    required={true}
                                    style={{margin: 'auto', width: "80%", align: 'center', marginTop: '40px'}}>
                                </TextField>
                                <TextField
                                    id="outlined-select-currency-native"
                                    value={taskDescription}
                                    label="Task Description"
                                    onChange={e => setTaskDescription(e.target.value)}
                                    helperText="Input task description"
                                    variant="outlined"
                                    required={true}

                                    style={{margin: 'auto', width: "80%", align: 'center', marginTop: '40px'}}>
                                </TextField>

                                <FormControl   style={{margin: 'auto', width: "80%", align: 'center', marginTop: '40px'}} className={classes.formControl}>
                                    <InputLabel  helperText="Select users who want to complete" style={{marginLeft: '10px'}}  id="demo-mutiple-name-label">Name</InputLabel>
                                    <Select
                                        labelId="demo-mutiple-name-label"
                                        id="demo-mutiple-name"
                                        label="Users"
                                        multiple
                                        required={true}
                                        helperText="Select users who want to complete"

                                        variant="outlined"
                                        value={sel}
                                        onChange={handleChange}
                                        // input={<Input />}
                                        // MenuProps={MenuProps}
                                    >
                                        {users.map((option) => (
                                            <MenuItem key={option._id} value={option.email} style={getStyles(option.email, sel, theme)}>
                                                {option.email}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    id="outlined-select-currency-native"
value={comments}
                                    label="Comments"
                                    onChange={e => setComments(e.target.value)}
                                    helperText="Any Comments"
                                    variant="outlined"

                                    style={{margin: 'auto', width: "80%", align: 'center', marginTop: '40px'}}>
                                </TextField>


                                <Button style={{
                                    margin: 'auto',
                                    width: "50%",
                                    align: 'center',
                                    marginTop: '40px',
                                    marginBottom: '40px'
                                }}  variant="contained" color="primary"
                                        disabled={
                                            taskName.length === 0 || taskDescription.length === 0 || sel.length === 0
                                        }
                                        onClick={() => {
                                            const leaveEntitlement = {
                                                "taskName": taskName,
                                                "taskDescription": taskDescription,
                                                "users": sel,
                                                "comments": comments,
                                                "token":tokenString


                                            }
                                            console.log(leaveEntitlement)
                                            return axios.post(`${process.env.REACT_APP_API_URL}/task`, leaveEntitlement).then(function (response) {
                                                    setComments('')
                                                setTaskDescription('')
                                                setTaskName('')
                                                toast.success(`SuccessFully updated your request`);
                                                }
                                            )
                                                .catch(function (error) {
                                                    toast.success("Please check all the details");
                                                    console.log(error);
                                                })
                                        }
                                        }>
                                    Add +
                                </Button>

                            </Grid>


                    </fieldset>


                </div>


            </div>
        );
    }
}