import React from 'react';
import {Redirect} from "react-router-dom";

export default class Logout extends React.Component{

    componentDidMount() {
        localStorage.removeItem("username");
        console.log(localStorage.getItem("username"))
    }

    render() {
        return(
            <Redirect to="/login"/>
        );
    }

}