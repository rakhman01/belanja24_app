import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import CombineSlice from './CombineSlice';
const Store = createStore(CombineSlice, applyMiddleware(thunk));
export default Store;
