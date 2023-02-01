import { getAllFactions } from "./faction/getAllFactions";
import { getCurrentUser } from "./user/getCurrentUser";
import { login } from "./user/login";
import { logout } from "./user/logout";
import { register } from "./user/register";

export const Api = {
  getCurrentUser: getCurrentUser,
  login: login,
  logout: logout,
  register: register,
  getAllFactions: getAllFactions,
};
