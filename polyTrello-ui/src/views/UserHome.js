import React from 'react';
import axios from 'axios';
import Task from "./Task";
import TextField from "@material-ui/core/TextField";
import Add from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

export default class UserHome extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            tasks: [],
            title: '',
            error: ''
        };

        this.addTask = this.addTask.bind(this);
    }

    async componentDidMount() {

        await axios.get(`http://localhost:8080/getTasks/${localStorage.getItem("username")}`)
            .then(res => {
                this.setState({tasks: res.data});
            })
            .catch(error => {
                console.log(error);
            });
    }

    addTask(e){
        e.preventDefault();
        let data = new FormData();
        data.append("title", this.state.title);
        axios.post(
            `http://localhost:8080/addTask/${localStorage.getItem("username")}`, data)
            .then(res => {
                if(res.data.status === "success")
                    window.location.reload();
                else
                    this.setState({
                        error: <div className="alert alert-danger text-center">An error occured</div>
                    });
            })
            .catch(error => {
                this.setState({
                    error: <div className="alert alert-danger text-center">An error occured</div>
                });
            });
    }

    render() {

        let tasks = [];

        if(this.state.tasks.length !== 0)
            this.state.tasks.map((task) => {
                tasks.push(<div className="col-md-3" key={task.id}> <Task task={task}/></div>);
            });

        return(
            <div className="container-fluid" style={{ marginTop : '100px'}}>
                {this.state.error}
                <div className="row">
                    {tasks}
                </div>
                <div className="row text-center" style={{marginTop: '20px', marginLeft: '1px'}}>
                    <form noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="addTask"
                            label="Add a new Task"
                            name="addTask"
                            onChange={(e) => this.setState({title : e.target.value})}
                        />
                    </form>
                    <IconButton
                        aria-label="Add"
                        onClick={this.addTask}
                    >
                        <Add/>
                    </IconButton>
                </div>

            </div>
        );
    }

}