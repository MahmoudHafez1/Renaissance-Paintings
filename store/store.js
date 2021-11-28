import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import favReducer from './favReducer';

const store = createStore(favReducer, applyMiddleware(thunk));

export default store;
