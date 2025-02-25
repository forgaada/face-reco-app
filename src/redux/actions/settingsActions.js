import {SETTINGS_CHANGED} from "../consts";

export const changeSettings = (data) => (
    {type: SETTINGS_CHANGED, data}
)