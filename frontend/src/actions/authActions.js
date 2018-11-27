import axios from 'axios';
import {
    SET_REGISTRATION_VALIDATION_MESSAGES,
    SET_LOGIN_ERROR_MESSAGES,
    SET_LOGIN_SUCCESS,
    LOGOUT, SET_REGISTRATION_SUCCESS
} from '../helpers/constants';

// Registration
export const register = (form) => {
    return dispatch => {
        axios.post(process.env.REACT_APP_API_URL + '/auth/register', form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((json) => {
                dispatch({
                    type: SET_REGISTRATION_SUCCESS,
                    data: {user: json.data.data.user, token: json.data.data.token, registrationSucceeded: true}
                });
            })
            .catch(error => {
                const validationErrors = error.response.data.errors.validation;
                dispatch({type: SET_REGISTRATION_VALIDATION_MESSAGES, data: validationErrors});
            });
    };
};

// Registration
export const login = (form) => {
    return dispatch => {
        axios.post(process.env.REACT_APP_API_URL + '/auth/login', form)
            .then((json) => {
                dispatch({
                    type: SET_LOGIN_SUCCESS,
                    data: {user: json.data.data.user, token: json.data.data.token, loginSucceeded: true}
                });
            })
            .catch(error => {
                console.log(error);
                const errorMessage = error.response.data.errors;
                dispatch({type: SET_LOGIN_ERROR_MESSAGES, data: errorMessage});
            });
    };
};

// Logout
export const logout = () => {
    return dispatch => {
        dispatch({type: LOGOUT, data: {logout: true}});
    };
};