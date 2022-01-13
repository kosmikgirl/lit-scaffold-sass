import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from '@reduxjs/toolkit/dist/createAction';

export type {{pascalCase name}}State = {};

export const {{camelCase name}}Slice = createSlice({
  name: '{{camelCase name}}',
  initialState: <{{pascalCase name}}State>{},
  reducers: {},
});

export const {} = {{camelCase name}}Slice.actions;

export default {{camelCase name}}Slice.reducer;
