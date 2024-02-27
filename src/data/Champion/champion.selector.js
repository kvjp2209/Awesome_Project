const selectChampionListOriginal = state => state.championListOriginal;
const selectChampionListConverted = state => state.championListConverted;
const selectIsLoading = state => state.isLoading;
const selectSetListChampionData = state => state.setListChampionData;
const selectFetchChampionListOriginal = state =>
  state.fetchChampionListOriginal;
const selectConvertToChampionListConverted = state =>
  state.convertToChampionListConverted;

export {
  selectChampionListOriginal,
  selectChampionListConverted,
  selectIsLoading,
  selectSetListChampionData,
  selectFetchChampionListOriginal,
  selectConvertToChampionListConverted,
};
