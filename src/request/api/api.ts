import { getAllFactions } from "./faction/getAllFactions";
import { addEquipment } from "./fighter/addEquipment";
import { addWeapon } from "./fighter/addWeapon";
import { createFighter } from "./fighter/createFighter";
import { deleteFighters } from "./fighter/deleteFighters";
import { getFighterPageInfo } from "./fighter/getFighterPageInfo";
import { getFighterTypes } from "./fighterType/getFighterTypes";
import { createTeam } from "./team/createTeam";
import { deleteTeam } from "./team/deleteTeam";
import { editTeam } from "./team/editTeam";
import { getRecentTeams as getRecentTeams } from "./team/getRecentTeams";
import { getTeam } from "./team/getTeam";
import { getTradingPost } from "./tradingPost/getTradingPost";
import { getCurrentUser } from "./user/getCurrentUser";
import { getUserTeams } from "./user/getUserTeams";
import { login } from "./user/login";
import { logout } from "./user/logout";
import { register } from "./user/register";

export const Api = {
  getCurrentUser: getCurrentUser,
  login: login,
  logout: logout,
  register: register,
  getAllFactions: getAllFactions,
  getUserTeams: getUserTeams,
  createTeam: createTeam,
  getRecentTeams: getRecentTeams,
  deleteTeam: deleteTeam,
  getTeam: getTeam,
  getFighterTypes: getFighterTypes,
  createFighter: createFighter,
  deleteFighters: deleteFighters,
  editTeam: editTeam,
  getTradingPost: getTradingPost,
  getFighterPageInfo: getFighterPageInfo,
  addEquipment: addEquipment,
  addWeapon: addWeapon,
};
