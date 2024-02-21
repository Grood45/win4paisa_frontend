import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initalStateType } from "../reduxType/types";

const initialState: initalStateType = {
  theme:false,
  showSideBar1: false,
  showSideBar2: false,
  showSideBar3: false,
};

//if actions object come then it's type is going to be PayloadAction<tpye>

export const navState = createSlice({
  name: "NavBarState",
  initialState,
  reducers: {
    
    manageSideBar_Fn: (state = initialState, action) => {
      const { payload } = action;

      switch (payload.type) {
        case "theme":
          return {...state, theme:!state.theme}
        case "sidebar1":
          return { ...state, showSideBar1: !state.showSideBar1 };

        case "sidebar2":
          return { ...state, showSideBar2: !state.showSideBar2 };

        case "sidebar3":
          return { ...state, showSideBar3: !state.showSideBar3 };

        default:
          return state;
      }
    },
  },
});

export const { manageSideBar_Fn } = navState.actions;
export default navState.reducer;

// export const navState=createSlice({
//     name:"NavBarState",
//     initialState,
//     reducers:{
//         changeTheme_Fn:(state=initialState)=>{

//             return {

//                     ...state, theme:!state.theme}
//         },
//         changeNavState_Fn:(state=initialState)=>{
//             return {
//                 ...state ,navbarState:!state.navbarState
//             }
//         },
//         showSidebar_Fn:(state=initialState ,action:PayloadAction<boolean>)=>{
//             return {...state, showSideBar:action.payload}
//         }
//     }

// })

// export const {changeTheme_Fn ,changeNavState_Fn ,showSidebar_Fn} =navState.actions
// export default navState.reducer
