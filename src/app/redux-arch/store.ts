
"use client"
import {configureStore  } from "@reduxjs/toolkit"
import { combineR } from "./fetures/reducers"
//store of our app;
//here we are going to add reducers ;
// import NavStateReducer from "./fetures/nav-slice"
// import checkReducer from "./fetures/check"

// const reducer=combineReducers({
//     NavStateReducer,checkReducer
// })

import {useSelector,TypedUseSelectorHook } from "react-redux"
export const store=configureStore({
reducer:{combineR}

})




export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch
export const useAppSelector:TypedUseSelectorHook<RootState> =useSelector;


//passing the provider;