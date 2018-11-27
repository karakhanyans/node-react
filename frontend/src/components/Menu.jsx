import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link, withRouter} from "react-router-dom";
import {me} from "../actions/userActions";
import {connect} from "react-redux";
import {store} from '../index';

const styles = {
    root: {
        flexGrow: 1,
    },
    class: 'menu',
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Menu extends Component {
    componentDidMount() {
        if (localStorage.getItem('token')) {
            store.dispatch(me());
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.user.errors.message) {
            this.props.history.push('/login');
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div id="menu">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Node-React Application
                        </Typography>
                        {this.props.user.data._id ?
                            <div>
                                <Button component={Link} to="/logout" color="inherit">Log Out</Button>
                            </div>
                            :
                            <div>
                                <Button component={Link} to="/login" color="inherit">Login</Button>
                                <span className="login-sign_up-divider-text">or</span>
                                <Button component={Link} to="/registration" color="inherit">Sign Up</Button>
                            </div>
                        }
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        me: () => {
            dispatch(me());
        }
    }
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(Menu)));