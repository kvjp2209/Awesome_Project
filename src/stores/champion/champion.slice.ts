import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {getChampionStats} from './champion.thunk';

import {ListChampion} from '@screens/Champion/Champion.type';

export type StateType = {
  championListOriginal: any[];
  championListConverted: ListChampion[];
  isLoading: boolean;
  error?: any;
};

const initialState: StateType = {
  championListOriginal: [],
  championListConverted: [],
  isLoading: false,
  error: null,
};

//Reducers
//
export const championSlice = createSlice({
  name: 'champion',
  initialState,
  reducers: {
    setListChampionData: (state, action: PayloadAction<ListChampion[]>) => {
      state.championListConverted = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getChampionStats.pending, (state: StateType) => {
        state.isLoading = true;
      })
      .addCase(getChampionStats.fulfilled, (state: StateType, action) => {
        state.championListOriginal = action.payload;

        state.isLoading = false;
      })
      .addCase(getChampionStats.rejected, (state: StateType, action) => {
        state.isLoading = true;
        state.error = action.error;
      });
  },
});

// Action creators are generated for each case reducer function
export const {setListChampionData} = championSlice.actions;

export default championSlice.reducer;
