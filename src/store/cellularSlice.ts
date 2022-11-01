import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {CellularData} from "../model/CellularData";
import {SimCard} from "../model/SimCard";
import {RootState} from "./store";
import {stat} from "fs";

interface CellularState {
  cellular: CellularData,
  simCards: SimCard[] | null
  editedSimCard: SimCard | null
}

const simCards = [
  {
    operator: 'SIM 1',
    'phone': '111111111',
    enabled: false,
    type: "4G",
    apn: {apn: 'internet.operator.glob', userName: 'apn-login', password: 'apn-password'}
  },
  {
    operator: 'SIM 2',
    'phone': '123123123',
    enabled: true,
    type: "3G",
    apn: {apn: 'internet.operator2.glob', userName: 'apn-login2', password: 'apn-password2'}
  },
] as SimCard[];

const cellularData = {
  enabledCards: simCards, currentSimCard: simCards[0], enableSwitch: true
} as CellularData;

const initialState = {
  cellular: cellularData,
  simCards: simCards,
  editedSimCard: null
} as CellularState;

export const cellularSlice = createSlice({
  name: 'cellular',
  initialState,
  reducers: {
    setSimSettings: (state, action: PayloadAction<SimCard>) => {
      // @ts-ignore
      state.simCards = state.simCards?.map(x => x.operator === action.payload.operator ? {...x, ...action.payload} : x);
      // @ts-ignore
      state.cellular.enabledCards = state.cellular.enabledCards?.map(x => x.operator === action.payload.operator ? {...x, ...action.payload} : x)

      if (state.editedSimCard)
        state.editedSimCard = action.payload;
    },
    setCellularData: (state, action: PayloadAction<CellularData>) => {
      state.cellular = action.payload;
    },
    setCurrentSim: (state, action: PayloadAction<SimCard>) => {
      state.editedSimCard = action.payload;
    }
  }
})

export const {setSimSettings, setCellularData, setCurrentSim} = cellularSlice.actions

export const editedSimCard = (state: RootState) => state.cellularState.editedSimCard;

export default cellularSlice.reducer;
