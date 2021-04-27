import { createStore, combineReducers } from "redux";
import rootReducers from './reducers'

export const store = createStore(rootReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => console.log(store.getState()))

