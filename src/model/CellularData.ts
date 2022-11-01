import {SimCard} from "./SimCard";
// настройки используемых сим-карт
export interface CellularData {
  enableSwitch: boolean,
  enabledCards: SimCard[] | null,
  currentSimCard: SimCard | null
}
