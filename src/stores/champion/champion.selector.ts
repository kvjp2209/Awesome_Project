import {createDraftSafeSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

const selectChampionReducer = (state: RootState) => state.rootReducer.champion;

const selectChampionListConverted = createDraftSafeSelector(
  [selectChampionReducer],
  champion => champion.championListConverted,
);

const selectChampionLoading = createDraftSafeSelector(
  [selectChampionReducer],
  champion => champion.isLoading,
);

const selectChampionListOriginal = createDraftSafeSelector(
  [selectChampionReducer],
  champion => champion.championListOriginal,
);

export {
  selectChampionListConverted,
  selectChampionLoading,
  selectChampionListOriginal,
};
