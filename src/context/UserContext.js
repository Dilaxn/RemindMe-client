import React, {useState} from "react";
import axios from "axios";


export { auth,readAllUsers};

function auth() {
    const tokenString = localStorage.getItem('id_token');

    return Promise.resolve().then(() => {
        return  axios.post(`${process.env.REACT_APP_API_URL}/auth`, {
            token: tokenString

        })
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

function readAllUsers() {
    const tokenString = localStorage.getItem('id_token');

    return Promise.resolve().then(() => {
        return  axios.get(`${process.env.REACT_APP_API_URL}/readAllUsers`)
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