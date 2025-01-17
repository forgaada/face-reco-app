import { combineReducers } from 'redux';
import overview from "./reducers/overview";

const rootReducer = combineReducers({
    overview: overview,
});

export default rootReducer;