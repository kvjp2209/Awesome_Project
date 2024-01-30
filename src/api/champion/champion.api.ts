import axios from 'axios';

const GET_ALL_HEROS = '/heroStats';

const getHeroStats = () => {
  return axios.get(GET_ALL_HEROS);
};

export const championApi = {
  getHeroStats,
};
