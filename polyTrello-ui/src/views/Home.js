import React from 'react';
import img from '../assets/images/todo.jpg';
import '../assets/styles/styles.css';
import { Link } from "react-router-dom";
import {Button, Typography} from "@material-ui/core";

/**
 * La classe générant la page d'acceuil
 */
export default class Home extends React.Component{

    render() {
        return (
            <div style={style} className="text-center">
                <div className="col-md-6" style={{ marginTop : '10%' }}>
                    <Typography variant="h4">
                        Hello, Welcome to PolyTrello start organizing now
                    </Typography>
                </div>
                <div className="col-md-3" style={{ marginTop : '20px'}}>
                    <Link
                        to="/login"
                        style={{textDecoration: 'none'}}
                    >
                        <Button variant="contained" color="secondary">
                            Get started
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

}

const style = {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundImage: `url(${img})`,
    backgroundSize: 'cover',
};