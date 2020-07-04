import {
    FETCH_USERLIST_SUCCESS,
    FETCH_USERLIST_FAILURE
} from "../actions/DashboardActions";

export default function DashboardReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_USERLIST_SUCCESS:
            return { ...action };
        case FETCH_USERLIST_FAILURE:
            return { ...action };
        default:
            return state;
    }
}