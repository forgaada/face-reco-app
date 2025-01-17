import {
    OVERVIEW_LOADING,
    OVERVIEW_LOADED,
} from "../consts"

const initialState = {
    overview: {
        data: [],
        loading: false
    }
}

const overview = (state = initialState, action) => {
    switch (action.type) {
        case OVERVIEW_LOADING:
            return { ...state, overview: {data: [], loading: true} }
        case OVERVIEW_LOADED:
            return { ...state, overview: {data: action.data, loading: false} }
        default: return state;
    }
}

export default overview;