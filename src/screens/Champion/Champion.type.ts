export type ChampionType = {
  localized_name: string;
  img: string;
  primary_attr: string;
  name: string;
};

export type ListChampion = {
  title: string;
  data: ChampionType[];
};
