import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    uid: '',
    

};
selfPatient: null




export const AppSlice = createSlice({
    name: "AppReducer",
    initialState,
    reducers: {
 
        setUid: (state, action) => {            
            state.uid = action.payload
        },
    },
});

export const {

    setUid,

} = AppSlice.actions;

export default AppSlice.reducer;