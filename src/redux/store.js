import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

/* Conf. would be consulted on Redux doc. */
const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;