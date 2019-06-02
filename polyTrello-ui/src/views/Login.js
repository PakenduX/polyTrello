import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import {Route} from "react-router-dom";


export default class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            error: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        let data = {
            username : this.state.username,
            password : this.state.password,
            enabled : true
        };
        axios.post('http://mamadembele.fr:8080/login', data)
            .then(res => {
                console.log(res);
                if(res.data.status === 'error')
                    this.setState({
                        error: <div className="alert alert-danger">Wrong email or password</div>
                    });
                else {
                    localStorage.setItem("username", this.state.username);
                    this.setState({logged: true});
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    render(){
        return (
            this.state.logged ?
                <Route render={({ history }) => history.push("/userHome")  }/> :
                <div className="row container-fluid" style={{ marginTop: '10%'}}>
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div className="row">
                            <div className="col-md-5"></div>
                            {this.state.error}
                            <div className="col-md-4">
                                <Typography component="h1" variant="h5">
                                    Sign in
                                </Typography>
                            </div>
                        </div>
                        <form noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoFocus
                                onChange={(e) => this.setState({username : e.target.value})}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => this.setState({password : e.target.value})}
                            />
                            <Button
                                style={{ marginTop : '20px'}}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={this.onSubmit}
                            >
                                Sign In
                            </Button>
                        </form>
                    </div>
                </div>
        );
    }
}