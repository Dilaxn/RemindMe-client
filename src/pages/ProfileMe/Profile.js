import { Button, Container, FormControlLabel, InputAdornment, Radio, RadioGroup, TextField } from '@material-ui/core';
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import {useHistory} from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { AccountCircle,CheckCircle,AlternateEmail } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(30),
        height: theme.spacing(30),
    },
}));
const datatableData = [
    ["Joe James", "Example Inc.", "Yonkers", "NY"],
    ["John Walsh", "Example Inc.", "Hartford", "CT"],
    ["Bob Herm", "Example Inc.", "Tampa", "FL"],
    ["James Houston", "Example Inc.", "Dallas", "TX"],
    ["Prabhakar Linwood", "Example Inc.", "Hartford", "CT"],
    ["Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
    ["Esperanza Susanne", "Example Inc.", "Hartford", "CT"],
    ["Christian Birgitte", "Example Inc.", "Tampa", "FL"],
    ["Meral Elias", "Example Inc.", "Hartford", "CT"],
    ["Deep Pau", "Example Inc.", "Yonkers", "NY"],
    ["Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
    ["Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
    ["Brigid Ankur", "Example Inc.", "Dallas", "TX"],
    ["Anna Siranush", "Example Inc.", "Yonkers", "NY"],
    ["Avram Sylva", "Example Inc.", "Hartford", "CT"],
    ["Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
    ["Gaston Festus", "Example Inc.", "Tampa", "FL"],
];

export default function Profile(props) {
    let [showForm, setShowForm] = useState(false);
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(new FormData());
    const classes = useStyles();
    // const onChangePicture = e => {
    //     if (e.target) {
    //         console.log(e.target);
    //         // console.log("picture: ", e.target.files);
    //         // setPicture(e.target.files[0]);
    //         // const reader = new FileReader();
    //         // reader.addEventListener("load", () => {
    //         //     setImgData(reader.result);
    //         // });
    //         // reader.readAsDataURL(e.target.files[0]);
    //     }
    // };
    const onChangePicture  = (event) => {
        // var ab = document.getElementById("myfile").files[0].name;
        // alert(ab);
        // console.log(event.target);
        setPicture(event.target.files[0]);
// setImgData('avatar', event.target.files[0])
        // imgData.append('avatar', event.target.files[0])

        console.log(event.target.files[0])
    };
    const tokenString = localStorage.getItem('id_token');
    let history = useHistory()
    return (
<center>
    <Container maxWidth="sm" style={{marginTop:"20px"}}>
                <form>
                    <Avatar alt="Remy Sharp" src="https://www.nobelprize.org/images/einstein-12923-content-portrait-mobile-tiny.jpg" className={classes.large} />
                    <input style={{marginTop:"20px",width:"50%"}}  type="file" onChange={onChangePicture} />
<br />
                    <Button
                        style={{marginTop:"20px"}}
                        // onClick={() => {
                        //     console.log(imgData)
                        //     let data = new FormData();
                        //
                        //     data.append('avatar', picture)
                        //
                        //     return axios.patch('/employees/me/avatar', data, {
                        //         headers: {
                        //             Authorization: `Bearer ${tokenString}`,
                        //             "Content-type": "multipart/form-data"
                        //         }
                        //     }).then(res => {
                        //         window.location.reload();
                        //         alert("SuccessFully Updated");
                        //
                        //     })
                        //         .catch(err=>alert("error"))
                        // }}
                        variant="contained" color="primary" >Upload!</Button>
                    <br/>
                    <div style={{marginTop:"20px"}}>
                    <TextField style={{marginTop:"10px"}}
                        className={classes.margin}
                        id="input-with-icon-textfield"
                        label="Name"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                    />
                        <TextField style={{marginTop:"10px"}}
                            className={classes.margin}
                            id="input-with-icon-textfield"
                            label="User Type"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CheckCircle />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <br/>
                        <TextField style={{marginTop:"10px"}}
                            className={classes.margin}
                            id="input-with-icon-textfield"
                            label="Email"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AlternateEmail />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                </form>
    </Container>
</center>

    );
}