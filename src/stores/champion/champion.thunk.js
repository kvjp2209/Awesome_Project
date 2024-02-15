import {createAsyncThunk} from '@reduxjs/toolkit';
import {championApi} from '../../api/champion/champion.api';

export const getChampionStats = createAsyncThunk(
  'champion/get/champs',
  async (_: any, {}) => {
    console.log('[getChampionStats]');
    const response = await championApi.getChampionStats();
    return response.data;
  },
);
