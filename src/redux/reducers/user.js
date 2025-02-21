import {USER_LOADED, USER_SIGNED_OUT} from "../consts"

const initialState = {
    user: {},
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADED:
            return { ...state, user: action.data }
        case USER_SIGNED_OUT:
            return { ...state, user: {} }

        default:
            return state
    }
}

export default user
