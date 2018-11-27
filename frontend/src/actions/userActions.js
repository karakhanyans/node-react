import axios from 'axios';
import {SET_USER_DATA, SET_USER_DATA_ERRORS} from '../helpers/constants';

// Get current logged in user data
export const me = () => {
    return dispatch => {
        axios.get(process.env.REACT_APP_API_URL + '/me', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((json) => {
                dispatch({type: SET_USER_DATA, data: json.data.data.user});
            })
            .catch(error => {
                const errors = error.response.data.errors;
                dispatch({type: SET_USER_DATA_ERRORS, data: errors});
            });
    };
};