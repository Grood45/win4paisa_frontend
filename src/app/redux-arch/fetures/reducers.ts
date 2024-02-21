
import NavStateReducer from "./nav-slice"
import AuthReducer from "../adminauth/auth.slice"
import UserAuthReducer from "../userauth/auth.slice"
import {combineReducers} from "redux"

export const combineR=combineReducers({
    NavStateReducer,
    auth:AuthReducer,
    userAuth:UserAuthReducer
})