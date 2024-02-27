import {create} from 'zustand';

import {championApi} from '@api/champion/champion.api';

const championStore = create((get, set) => ({
  championListOriginal: [],
  championListConverted: [],
  isLoading: false,
  error: null,

  setListChampionData: listChampionData => {
    set({championListConverted: listChampionData});
  },

  fetchChampionListOriginal: async () => {
    set({isLoading: true});
    try {
      const response = await championApi.getChampionStats();
      set({isLoading: false});
      set({championListOriginal: response.data});
    } catch (error) {
      console.log(
        '🐩 ~ file: champion.store.js:18 ~ fetchChampionListOriginal: ~ error:',
        error,
      );
    }
  },

  convertToChampionListConverted: () => {
    const champions = get().championListOriginal;
    return champions.reduce((acc: any[], current: any) => {
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
}));

export default championStore;
