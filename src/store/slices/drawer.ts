import {createSlice} from '@reduxjs/toolkit';

interface IDrawerState {
  value: boolean;
}

const initialDrawerState: IDrawerState = {
  value: false,
};

const drawerSlice = createSlice({
  name: 'drawer',
  initialState: initialDrawerState,
  reducers: {
    toggleDrawer: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {toggleDrawer} = drawerSlice.actions;

const drawerReducer = drawerSlice.reducer;

export default drawerReducer;
