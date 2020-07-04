import { combineReducers } from 'redux'

import AuthReducer from './AuthReducer'
import DashboardReducer from './DashboardReducer'

const rootReducer = combineReducers(
    {
        AuthReducer,
        DashboardReducer
    }
)
export default rootReducer;