import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IConfig} from '../index';
import {config} from '../constants/config';
type TKeyUserAction=keyof IConfig['conference']['user']

const configSlice=createSlice({
  name: 'config',
  initialState: config,
  reducers: {
    changeUser: ((state, action:PayloadAction<{key: TKeyUserAction, value: string}>)=>{
      state.conference.user[action.payload.key]=action.payload.value
    }),
    changeLogin:((state, action)=>{
      state.conference.loginin=action.payload
    })
  }
})

export const {changeUser, changeLogin}=configSlice.actions

export default configSlice.reducer
