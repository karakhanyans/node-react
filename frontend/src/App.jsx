import React, {Component} from 'react';
import Menu from "./components/Menu.jsx";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Registration from "./containers/Auth/Registration";
import Login from "./containers/Auth/Login";
import Logout from "./containers/Auth/Logout";
import Authenticated from "./middlewares/Authenticated";
import Profile from "./containers/User/Profile";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Menu/>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/profile" component={Authenticated(Profile)}/>
                        <Route exact component={Registration}/>
                        <Route exact path="/registration" component={Registration}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
