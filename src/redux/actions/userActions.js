import {USER_LOADED, USER_SIGNED_OUT} from "../consts";

export const loadUser = (data) => (
    {type: USER_LOADED, data}
)

export const signOutUser = () => (
    {type: USER_SIGNED_OUT}
)