import { combineReducers } from 'redux';
import overview from "./reducers/overview";
import user from "./reducers/user";
import settings from "./reducers/settings";

const rootReducer = combineReducers({
    overview: overview,
    user: user,
    settings: settings
});

export default rootReducer;