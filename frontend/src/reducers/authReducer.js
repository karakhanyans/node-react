import {
    SET_REGISTRATION_SUCCESS,
    SET_REGISTRATION_VALIDATION_MESSAGES,
    LOGOUT,
    SET_LOGIN_ERROR_MESSAGES,
    SET_LOGIN_SUCCESS
} from "../helpers/constants";

const initState = {
    errors: [],
    data: []
};

export default function auth(state = initState, action) {
    state.errors = initState.errors;
    state.data = initState.data;
    switch (action.type) {
        case SET_REGISTRATION_VALIDATION_MESSAGES: {
            return {...state, errors: action.data};
        }
        case SET_REGISTRATION_SUCCESS: {
            return {...state, data: action.data}
        }
        case SET_LOGIN_ERROR_MESSAGES: {
            return {...state, errors: action.data};
        }
        case SET_LOGIN_SUCCESS: {
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