import {getCurrentUser} from "./user/getCurrentUser";
import {login} from "./user/login";
import {logout} from "./user/logout";

export const Api = {
  getCurrentUser: getCurrentUser,
  login: login,
  logout: logout,
}