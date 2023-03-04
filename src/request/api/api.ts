import { getAllFactions } from "./faction/getAllFactions";
import { addProfile } from "./fighter-weapon/addProfile";
import { getUpgradesAndProfiles } from "./fighter-weapon/getUpgradesAndProfiles";
import { removeProfile } from "./fighter-weapon/removeProfile";
import { addEquipment } from "./fighter/addEquipment";
import { addWeapon } from "./fighter/addWeapon";
import { createFighter } from "./fighter/createFighter";
import { deleteFighters } from "./fighter/deleteFighters";
import { getFighter } from "./fighter/getFighter";
import { removeEquipment } from "./fighter/removeEquipment";
import { removeWeapon } from "./fighter/removeWeapon";
import { getFighterTypes } from "./fighterType/getFighterTypes";
import { createTeam } from "./team/createTeam";
import { deleteTeam } from "./team/deleteTeam";
import { editTeam } from "./team/editTeam";
import { getNavigationInfo } from "./team/getNavigationInfo";
import { getRecentTeams as getRecentTeams } from "./team/getRecentTeams";
import { getTeam } from "./team/getTeam";
import { getTeamCash } from "./team/getTeamCash";
import { getTradingPost } from "./tradingPost/getTradingPost";
import { getCurrentUser } from "./user/getCurrentUser";
import { getUserTeams } from "./user/getUserTeams";
import { login } from "./user/login";
import { logout } from "./user/logout";
import { register } from "./user/register";

export const Api = {
  user: {
    getCurrentUser: getCurrentUser,
    login: login,
    logout: logout,
    register: register,
    getUserTeams: getUserTeams,
  },
  factions: {
    getAllFactions: getAllFactions,
  },
  team: {
    createTeam: createTeam,
    getRecentTeams: getRecentTeams,
    deleteTeam: deleteTeam,
    getTeam: getTeam,
    getNavigationInfo: getNavigationInfo,
    editTeam: editTeam,
    getTeamCash: getTeamCash,
  },
  fighterType: {
    getFighterTypes: getFighterTypes,
  },
  fighter: {
    createFighter: createFighter,
    deleteFighters: deleteFighters,
    getFighter: getFighter,
    addEquipment: addEquipment,
    addWeapon: addWeapon,
    removeEquipment: removeEquipment,
    removeWeapon: removeWeapon,
  },
  tradingPost: {
    getTradingPost: getTradingPost,
  },
  fighterWeapon: {
    getUpgradesAndProfiles: getUpgradesAndProfiles,
    addProfile: addProfile,
    removeProfile: removeProfile,
  },
};
