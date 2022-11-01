import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {NtripSettings} from "../model/NtripSettings";
import type { RootState } from './store';

type ConnectionState = 'not_connected' | 'connect' | 'connected' | 'fail';

interface NtripState {
  connectionState: ConnectionState,
  settings: NtripSettings
}

const initialState = {
  connectionState: "not_connected",
  settings: {login: 'abc', port: 3333, mountPoint: '/asdfsdf/as', password: '/ssss', server: 'example.com'}
} as NtripState;

export const ntripSlice = createSlice({
  name: 'ntrip',
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<NtripSettings>) => {
      state.settings = action.payload;
    }
  }
})

export const { setSettings} = ntripSlice.actions

export const ntripState = (state: RootState) => state.ntripState.connectionState;

export default ntripSlice.reducer;
