import {RootState} from '@stores/store';

import {createDraftSafeSelector} from '@reduxjs/toolkit';

const selectChampionReducer = (state: RootState) =>
  state.persistedReducer.champion;

const selectChampionListConverted = createDraftSafeSelector(
  selectChampionReducer,
  champion => {
    return champion.championListOriginal.reduce((acc: any[], current: any) => {
      let listChampWithPrimeAttr = acc.filter(
        item => item.title === current.primary_attr,
      );

      if (listChampWithPrimeAttr.length) {
        listChampWithPrimeAttr[0].data.push(current);
        return acc;
      }
      const newItem: any = {
        title: current.primary_attr,
        data: [current],
      };
      acc.push(newItem);
      return acc;
    }, []);
  },
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
