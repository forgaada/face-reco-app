import { combineReducers } from 'redux';
import overview from "./reducers/overview";
import user from "./reducers/user";

const rootReducer = combineReducers({
    overview: overview,
    user: user
});

export default rootReducer;