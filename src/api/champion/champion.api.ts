import axios from 'axios';

const GET_ALL_CHAMPIONS = '/heroStats';

const getChampionStats = () => {
  return axios.get(GET_ALL_CHAMPIONS);
};

export const championApi = {
  getChampionStats,
};
