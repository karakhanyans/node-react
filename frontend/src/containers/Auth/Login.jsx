import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from "react-redux";
import {login} from "../../actions/authActions";
import {me} from "../../actions/userActions";
import Alert from "../../components/Alert";
import {WRONG_CREDENTIALS} from "../../helpers/errors";
import {store} from "../../index";

// Set react-material package components styles
const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class Login extends Component {
    state = {
        form: {},
        loginClicked: false
    };

    // Handle component updates
    componentWillUpdate(nextProps) {
        if (nextProps.login.data.loginSucceeded) {
            localStorage.setItem('token', nextProps.login.data.token);
            store.dispatch(me());
            this.props.history.push('/profile');
        }
    }

    // Call login action
    login = () => {
        this.props.signIn(this.state.form);
        this.setState({loginClicked: true})
    };

    // Handle input changes and set input value in state
    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    };

    // Render component view
    render() {
        const {classes} = this.props;
        return (
            <main className={classes.layout}>
                <div id="login">
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <form className={classes.form}>
                            {(this.props.login.errors && this.props.login.errors.message === WRONG_CREDENTIALS) ? <Alert
                                variant="error"
                                className={classes.margin}
                                message="Wrong E-mail or Password"
                            /> : false}
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input id="email" name="email" onChange={this.handleChange}/>
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input name="password" type="password" id="password" onChange={this.handleChange}/>
                            </FormControl>
                            <Button type="button" fullWidth variant="contained" color="primary"
                                    className={classes.submit} onClick={this.login}>
                                Login
                            </Button>
                        </form>
                    </Paper>
                </div>
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.auth,
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (form) => {
            dispatch(login(form));
        }
    }
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Login));