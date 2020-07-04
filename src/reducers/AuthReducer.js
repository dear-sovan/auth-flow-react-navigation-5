import {
    LOGGEDIN_SUCCESS,
    LOGGEDIN_FAILURE,
    LOGGEDOUT_SUCCESS,
    LOGGEDOUT_FAILURE
} from "../actions/AuthActions";

export default function AuthReducer(state = {}, action) {
    switch (action.type) {
        case LOGGEDIN_SUCCESS:
            return { isLoggedIn: true };
        case LOGGEDIN_FAILURE:
            return { isLoggedIn: false };
        case LOGGEDOUT_SUCCESS:
            return { isLoggedIn: false };
        case LOGGEDOUT_FAILURE:
            return { isLoggedIn: true };
        default:
            return state;
    }
}