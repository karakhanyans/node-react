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
import ImageUploader from "../../components/ImageUploader";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import {connect} from "react-redux";
import {register} from "../../actions/authActions";

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

class Registration extends Component {
    form = new FormData();

    // Call registration action
    register = () => {
        this.props.register(this.form);
    };

    // Handle component updates
    componentWillUpdate(nextProps) {
        if (nextProps.registration.data.registrationSucceeded) {
            this.props.history.push('/login');
        }
    }

    // Handle input changes and set input value in state
    handleChange = (e) => {
        this.form.set(e.target.name, e.target.value);
    };

    // Set image file object in state
    saveImage = (image) => {
        this.form.set('photo', image);
    };

    // Check if input has error or not
    hasError = (name) => {
        let has = false;
        if (this.props.registration.errors[name] !== undefined) {
            has = true;
        }
        return has;
    };

    // Get input error message
    getError = (name) => {
        let message = null;
        if (this.props.registration.errors[name] !== undefined) {
            message = this.props.registration.errors[name].message;
        }
        return message;
    };

    // Render component view
    render() {
        const {classes} = this.props;
        return (
            <main className={classes.layout}>
                <div id="signUp">
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        <form className={classes.form} encType='multipart/form-data'>
                            <FormControl margin="normal"
                                         error={this.hasError('first_name')}
                                         fullWidth>
                                <InputLabel htmlFor="email">First Name</InputLabel>
                                <Input id="firstName" name="first_name" autoFocus onChange={this.handleChange}/>
                                {this.hasError('first_name') ?
                                    <FormHelperText
                                        id="component-error-text">
                                        {this.getError('first_name')}
                                    </FormHelperText>
                                    : false}
                            </FormControl>
                            <FormControl margin="normal" fullWidth
                                         error={this.hasError('last_name')}>
                                <InputLabel htmlFor="email">Last Name</InputLabel>
                                <Input id="lastName" name="last_name" onChange={this.handleChange}/>
                                {this.hasError('last_name') ?
                                    <FormHelperText
                                        id="component-error-text">
                                        {this.getError('last_name')}
                                    </FormHelperText>
                                    : false}
                            </FormControl>
                            <FormControl margin="normal" fullWidth
                                         error={this.hasError('email')}>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input id="email" name="email" onChange={this.handleChange}/>
                                {this.hasError('email') ?
                                    <FormHelperText
                                        id="component-error-text">
                                        {this.getError('email')}
                                    </FormHelperText>
                                    : false}
                            </FormControl>
                            <FormControl margin="normal"
                                         error={this.hasError('photo')}
                                         fullWidth>
                                <div id="uploader">
                                    <ImageUploader classes={classes} saveImage={this.saveImage}/>
                                </div>
                                {this.hasError('photo') ?
                                    <FormHelperText
                                        id="component-error-text">
                                        {this.getError('photo')}
                                    </FormHelperText>
                                    : false}
                            </FormControl>
                            <FormControl margin="normal" fullWidth
                                         error={this.hasError('password')}>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input name="password" type="password" id="password" onChange={this.handleChange}/>
                                {this.hasError('password') ?
                                    <FormHelperText
                                        id="component-error-text">
                                        {this.getError('password')}
                                    </FormHelperText>
                                    : false}
                            </FormControl>
                            <FormControl margin="normal" fullWidth
                                         error={this.hasError('confirm_password')}>
                                <InputLabel htmlFor="password">Confirm Password</InputLabel>
                                <Input name="confirm_password" type="password" id="confirmPassword"
                                       onChange={this.handleChange}/>
                                {this.hasError('confirm_password') ?
                                    <FormHelperText
                                        id="component-error-text">
                                        {this.getError('confirm_password')}
                                    </FormHelperText>
                                    : false}
                            </FormControl>
                            <Button type="button" fullWidth variant="contained" color="primary"
                                    className={classes.submit} onClick={this.register}>
                                Register
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
        registration: state.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        register: (form) => {
            dispatch(register(form));
        }
    }
};


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Registration));