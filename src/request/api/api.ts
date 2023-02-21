import { getAllFactions } from "./faction/getAllFactions";
import { createFighter } from "./fighter/createFighter";
import { deleteFighters } from "./fighter/deleteFighters";
import { getFighterTypes } from "./fighterType/getFighterTypes";
import { createTeam } from "./team/createTeam";
import { deleteTeam } from "./team/deleteTeam";
import { getRecentTeams as getRecentTeams } from "./team/getRecentTeams";
import { getTeam } from "./team/getTeam";
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
};
