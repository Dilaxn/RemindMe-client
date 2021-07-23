import { Button, Container, FormControlLabel, InputAdornment, Radio, RadioGroup, TextField } from '@material-ui/core';
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import React, { useCallback, useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { useHistory, useLocation } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { AccountCircle, CheckCircle, AlternateEmail, PersonOutline, Visibility } from '@material-ui/icons';
import { readAllTasks } from '../../context/TaskContext';
import { auth } from '../../context/UserContext';
import { useLogger } from '@material-ui/data-grid';
import { toast, ToastContainer } from 'react-toastify';
import HeaderComponent from '../../components/header/HeaderComponent';

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


export default function ProfileF(props ) {

    const location = useLocation();
    useEffect(() => {
        if(location.state){
            console.log(location.state.prop1)
            setEm((location.state.prop1)[0])

        }
        else{
            // alert("yes")
            // console.log("x"+props)
            // setEmpID("604706c638c7f10c93f6c1a7")
        }

    }, [location]);
    let [emp, setEm] = useState([]);
    const [picture, setPicture] = useState(null);
    const [imageHash, setImageHash]  = useState(Date.now());

    //
    // let [user,setUser]= useState('');
    // let [name,setName]= useState('');
    // let [up,setUp]= useState(true);
    //
    //
    // useEffect(() => {
    //     auth().then(r=>{
    //         setUser(r)
    //         setName(r.name)
    //     })
    //
    // }, [up]);
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
//     const onChangePicture  = (event) => {
//         // var ab = document.getElementById("myfile").files[0].name;
//         // alert(ab);
//         // console.log(event.target);
//         setPicture(event.target.files[0]);
// // setImgData('avatar', event.target.files[0])
//         // imgData.append('avatar', event.target.files[0])
//
//
//     };
    const tokenString = localStorage.getItem('id_token');
    let history = useHistory()
    return (
        <div>
            <ToastContainer />
            <center>
                <Container maxWidth="sm" style={{marginTop:"20px"}}>
                    <form >
                        <Avatar key={Date.now()}  alt="profile pic" src={`${process.env.REACT_APP_API_URL}/${emp[2]}/pic?`} className={classes.large} />
                        <br />
                        <br/>
                        <div style={{marginTop:"20px"}}>
                            <TextField style={{marginTop:"10px"}}
                                       className={classes.margin}
                                       id="input-with-icon-textfield"
                                       label="Name"
                                       value={emp[0]}
                                       InputProps={{
                                           startAdornment: (
                                               <InputAdornment position="start">
                                                   <PersonOutline />
                                               </InputAdornment>

                                           ),
                                           endAdornment: (
                                               <InputAdornment position="end">

                                               </InputAdornment>

                                           )
                                       }}

                            />

                            <br/>
                            <TextField style={{marginTop:"60px"}}
                                       className={classes.margin}
                                       id="input-with-icon-textfield"
                                       value={"subscriber"}
                                       label="User Type"
                                       InputProps={{
                                           startAdornment: (
                                               <InputAdornment position="start">
                                                   <Visibility />
                                               </InputAdornment>
                                           ),
                                       }}
                            />

                            <TextField style={{marginTop:"20px"}}
                                       className={classes.margin}
                                       id="input-with-icon-textfield"
                                       label="Email"
                                       contentEditable={'false'}
                                       value={emp[1]}
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
        </div>
    );
}