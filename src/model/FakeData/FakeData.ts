import { RangStatistics } from "../Dto/TeamView";
import { MyTeamPreview, Territory } from "../Types";

export const MyTeamPreviewExample: MyTeamPreview[] = [
  {
    name: "my roster 1",
    faction: "ash nomads",
  },
  {
    name: " my roster 2",
    faction: "orlocks",
  },
  {
    name: " my roster 2",
    faction: "orlocks",
  },
  {
    name: " my roster 2",
    faction: "orlocks",
  },
  {
    name: " my roster 2",
    faction: "orlocks",
  },
];

export const rangStatisticsExample: RangStatistics = {
  total: 3,
  rangs: [
    {
      name: "leader",
      count: 1,
    },
    {
      name: "champion",
      count: 2,
    },
    {
      name: "ganger",
      count: 3,
    },
  ],
};

export const territoriesExample: Territory[] = [
  {
    id: 123,
    name: "Guilder stronghold",
  },
];
