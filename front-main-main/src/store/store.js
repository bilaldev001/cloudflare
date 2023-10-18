import { combineReducers, legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import DataReducer from './data/reducers/DataReducer';

const { persistStore, persistReducer } = require('redux-persist');

const rootReducer = combineReducers({
    data: DataReducer,
});

let devtools, store;
const isClient = typeof window !== 'undefined';
if (isClient) {
    devtools =
        window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : (f) => f;

    const storage = require('redux-persist/lib/storage').default;
    const persistConfig = {
        key: 'wohoo-predict',
        storage,
    };

    store = createStore(
        persistReducer(persistConfig, rootReducer),
        compose(applyMiddleware(thunk), devtools)
    );

    store.__PERSISTOR = persistStore(store);
} else {
    store = createStore(rootReducer, compose(applyMiddleware(thunk)));
}

export { store };