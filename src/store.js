import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import rootReducer from './reducer';
import { createLogger } from 'redux-logger';

let middlewares = [];

// register middlewares
middlewares.push(thunk);
middlewares.push(promise);

middlewares.push(createLogger());

let finalMiddleware = applyMiddleware(...middlewares);

finalMiddleware = compose(finalMiddleware, window.devToolsExtension());

const store = createStore(rootReducer, finalMiddleware);

export { store };
