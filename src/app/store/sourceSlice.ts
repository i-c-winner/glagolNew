import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISource } from '../types';

const initialState: ISource = {
  sharing: undefined,
  remoteStreams: []
};
const sourceSlice = createSlice({
  name: 'source',
  initialState,
  reducers: {
    addSharing: ((state, action: PayloadAction<string>) => {
      state.sharing = action.payload;
    }),
    removeSharing: ((state) => {
      state.sharing = undefined;
    }),
    addRemoteTrack: ((state, action: PayloadAction<string>) => {
      state.remoteStreams.push(action.payload);
    }),
    removeRemoteTrack: ((state, action: PayloadAction<string>) => {
      state.remoteStreams = state.remoteStreams.filter((id: string) => {
        return id !== action.payload;
      });
    })
  }
});

export const { addSharing, removeSharing, removeRemoteTrack, addRemoteTrack } = sourceSlice.actions;
export default sourceSlice.reducer