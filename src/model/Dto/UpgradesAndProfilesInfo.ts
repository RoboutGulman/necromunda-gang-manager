import { WeaponProfile, WeaponUpgrade } from "../Types";

export class UpgradesAndProfilesInfo {
  profiles!: {
    mounted: WeaponProfile[];
    available: WeaponProfile[];
  };
  upgrades!: {
    mounted: WeaponUpgrade[];
    available: WeaponUpgrade[];
  };
}
