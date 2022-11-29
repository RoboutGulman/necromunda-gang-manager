import {FighterView, User} from "../Types";

export class TeamView {
  id !: string;
  name !: string;
  fighters !: FighterView[];
  faction !: string;
  creator !: User;
}
