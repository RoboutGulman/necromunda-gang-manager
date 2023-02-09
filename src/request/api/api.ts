import { getAllFactions } from "./faction/getAllFactions";
import { createTeam } from "./team/createTeam";
import { getResentTeams } from "./team/resentTeams";
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
  getResentTeams: getResentTeams,
};
