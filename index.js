/**
 * @format
 */
import React from "react"
import { AppRegistry } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import storageMiddleware, { actions as storageActions } from './src/middleware/storageMiddleware';

import { name as appName } from './app.json';
import reducers from "./src/reducers"
import App from './App';

const logger = createLogger({
    collapsed: true,
    level: 'info',
});


const rootReducer = (state, action) => {
    return reducers(state, action);
}

const middleware = applyMiddleware(thunk, storageMiddleware, logger);
const store = createStore(rootReducer, middleware);
store.dispatch(storageActions.appLoad());

const Component = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Component);
