import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import img from '../assets/images/todo.jpg'
import Done from "@material-ui/icons/Done";
import moment from 'moment';
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Ok from "@material-ui/icons/Done";
import Cancel from "@material-ui/icons/Cancel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";

const classes = makeStyles(theme => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default class Task extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            editing: false,
            done: props.task.done
        };

        this.deleteTask = this.deleteTask.bind(this);
        this.modifyTask = this.modifyTask.bind(this);
    }

    deleteTask(e){
        e.preventDefault();

        if(window.confirm("Are you sure you want to delete this task ?"))
            axios.delete(`http://mamadembele.fr:8080/deleteTask/${this.props.task.id}`)
                .then(res => {
                    console.log(res.data);
                    if(res.data.status === 'success')
                        window.location.reload();
                    else
                        alert("An error occured");
                })
                .catch(error => {
                    alert("An error occured");
                })


    }

    modifyTask(e){
        e.preventDefault();
        let data = new FormData();
        data.append("title", this.state.title);
        data.append("done", this.state.done);

        axios.put(`http://mamadembele.fr:8080/modifyTask/${this.props.task.id}`, data)
            .then(res => {
                if(res.data.status === 'success')
                    window.location.reload();
                else
                    alert("An error occured");
            })
            .catch(error => {
                alert("An error occured");
            });
    }

    render() {
        moment().locale('fr');

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                            U
                        </Avatar>
                    }
                    title={this.props.task.title}
                    subheader={moment(this.props.task.date).format('LL')}
                />
                <CardMedia
                    className={classes.media}
                    image={img}
                    style={{height: '200px'}}
                    title=""
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Edit or delete your task
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {
                        !this.state.editing ?
                            <IconButton
                                aria-label="Edit"
                                onClick={() => this.setState({editing : true})}
                            >
                                <Edit style={{width: '30px', height: '30px'}}/>
                            </IconButton> : null
                    }

                    {
                        !this.state.editing ?
                                this.props.task.done ?
                                    <Done style={{ color : 'green', width: '30px', height: '30px'}}/> : null
                            : null
                    }
                    {
                        !this.state.editing ?
                            <IconButton
                                aria-label="Delete"
                                onClick={this.deleteTask}
                            >
                                <Delete style={{ width: '30px', height: '30px'}}/>
                            </IconButton> : null
                    }

                    {
                        this.state.editing ?
                            <FormGroup row>
                                <form noValidate>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="addTask"
                                        label="Modify this Task"
                                        name="addTask"
                                        onChange={(e) => this.setState({title: e.target.value})}
                                    />
                                </form>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            value="done"
                                            checked={this.state.done}
                                            onChange={(e) => this.setState({done: e.target.checked})}/>
                                    }
                                    label="Done ?"
                                />
                                <IconButton
                                    aria-label="Ok"
                                    onClick={this.modifyTask}
                                >
                                    <Ok/>
                                </IconButton>
                                <IconButton
                                    aria-label="Ok"
                                    onClick={() => this.setState({editing: false})}
                                >
                                    <Cancel/>
                                </IconButton>
                            </FormGroup> : null
                    }

                </CardActions>
            </Card>
        );
    }
}
