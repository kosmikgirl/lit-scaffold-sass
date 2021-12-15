import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from '@reduxjs/toolkit/dist/createAction';
import {PageMetadata} from '../../data/type/';

export type DatabaseState = {};

export const databaseSlice = createSlice({
  name: 'database',
  initialState: <DatabaseState>{},
  reducers: {},
});

export const {} = databaseSlice.actions;

export default databaseSlice.reducer;
