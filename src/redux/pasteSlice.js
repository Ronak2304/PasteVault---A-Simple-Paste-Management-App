import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    pastes: (() => {
        const storedPastes = localStorage.getItem("pastes");
        return storedPastes ? JSON.parse(storedPastes) : []; 
    })()
};

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addtoPastes:(state,action) => {
        const paste = action.payload;
        if (!Array.isArray(state.pastes)) {
            console.error("pastes is not an array! Resetting to empty array.");
            state.pastes = [];
        }
    
        state.pastes.push(paste);
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success('Paste Created Successfully!');

    },
    updatetoPastes:(state,action) => {
        const paste = action.payload;
        const index = state.pastes.findIndex((item)=> item._id === paste._id);

        if(index>=0){
            state.pastes[index] = paste;
            localStorage.setItem("pastes",JSON.stringify(state.pastes));
            toast.success("Paste updated successfully");

        }
    },
    deletePaste: (state,action) => {
        const pasteId = action.payload;
        const index = state.pastes.findIndex((item)=>item._id === pasteId);

        if (index>=0){
            state.pastes.splice(index,1);
            localStorage.setItem("pastes",JSON.stringify(state.pastes))
            toast.success("Paste Deleted")
        }
    },
    resetallPastes: (state) => {
        state.pastes = [];
        localStorage.removeItem("pastes");
    }
  },
})

// Action creators are generated for each case reducer function
export const { addtoPastes, updatetoPastes, deletePaste, resetallPastes } = pasteSlice.actions

export default pasteSlice.reducer