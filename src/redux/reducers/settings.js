import {SETTINGS_CHANGED} from "../consts"

const initialState = {
    settings: {
        model: "llama-3.3-70b-versatile"
    },
}

const settings = (state = initialState, action) => {
    switch (action.type) {
        case SETTINGS_CHANGED:
            return { ...state, settings: action.data }

        default:
            return state
    }
}

export default settings