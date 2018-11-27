import {SET_USER_DATA, SET_USER_DATA_ERRORS, LOGOUT} from '../helpers/constants';

const initState = {
    errors: [],
    data: [],
};

export default function user(state = initState, action) {
    state.data = initState.data;
    state.errors = initState.errors;
    switch (action.type) {
        case SET_USER_DATA_ERRORS: {
            return {...state, errors: action.data};
        }
        case SET_USER_DATA: {
            return {...state, data: action.data};
        }
        case LOGOUT: {
            return {...state, data: action.data};
        }
        default: {
            return state;
        }
    }
}