import React, {useState} from "react";
import axios from "axios";


export { readAllTasks,};

function readAllTasks() {
    const tokenString = localStorage.getItem('id_token');

    return Promise.resolve().then(() => {
        return  axios.get(`${process.env.REACT_APP_API_URL}/task`)
            .then(response => {
                // setUserData(response.data);
                // console.log(response.data);
                return(response.data);

            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}