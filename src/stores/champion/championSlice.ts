import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export type Champion = {
  localized_name: string;
  img: string;
  primary_attr: string;
  name: string;
};

export type ListChampion = {
  title: string;
  data: Champion[];
};

const initialState = {
  data: [],
  isLoading: false,
}; //Reducers
//
export const championSlice = createSlice({
  name: 'champion',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<ListChampion[]>) => {
      state.data = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setData, setIsLoading} = championSlice.actions;

export default championSlice.reducer;
