import React, {useState} from "react";
import axios from "axios";

const tokenString = localStorage.getItem('id_token');

export { auth};

function auth() {
    return Promise.resolve().then(() => {
        console.log(tokenString);
        return  axios.post(`${process.env.REACT_APP_API_URL}/auth`, {
            token: tokenString

        })
            .then(response => {
                // setUserData(response.data);
                return(response.data);
                console.log(response.data);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}