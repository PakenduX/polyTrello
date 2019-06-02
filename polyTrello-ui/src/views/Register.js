import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import {Route} from "react-router-dom";


export default class Register extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordConfirm: '',
            error: '',
            registered: false
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();

        if(this.state.password === '' || (this.state.password !== this.state.passwordConfirm))
            this.setState({
                error: <div className="alert alert-danger">Les deux mots de passe sont différents</div>
            });
        else{
            let data = {
                username : this.state.username,
                password : this.state.password,
                enabled : true
            };

            axios.post('http://localhost:8080/register', data)
                .then(res => {
                    if(res.data.status === 'error')
                        this.setState({
                            error: <div className="alert alert-danger">Check your username</div>
                        });
                    else
                        this.setState({registered: true});
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    render(){
        return (
            this.state.registered ?
                <Route render={({ history }) => history.push("/login")  }/> :
                <div className="row container-fluid" style={{ marginTop: '10%'}}>
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div className="row">
                            <div className="col-md-5"></div>
                            {this.state.error}
                            <div className="col-md-4">
                                <Typography component="h1" variant="h5">
                                    Register
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
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="passwordConfirm"
                                label="Confirm Password"
                                type="password"
                                id="passwordConfirm"
                                autoComplete="current-password"
                                onChange={(e) => this.setState({passwordConfirm : e.target.value})}
                            />
                            <Button
                                style={{ marginTop : '20px'}}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={this.onSubmit}
                            >
                                Register
                            </Button>
                        </form>
                    </div>
                </div>
        );
    }
}