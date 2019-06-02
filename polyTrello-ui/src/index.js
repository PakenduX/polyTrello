import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Nav from "./views/Nav";
import Login from "./views/Login";
import Home from "./views/Home";
import Register from "./views/Register";
import Task from "./views/Task";
import UserHome from "./views/UserHome";
import Logout from "./views/Logout";

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route component={Nav} />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/task" component={Task} />
                <Route exact path="/userHome" component={UserHome} />
                <Route exact path="/logout" component={Logout} />
            </Switch>
        </div>
    </BrowserRouter>,
    document.getElementById('root')
);

serviceWorker.unregister();
