import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';

export type AppState = {
  isInitialized: boolean;
};

export const appSlice = createSlice({
  name: 'app',
  initialState: <AppState>{
    isInitialized: false,
  },
  reducers: {
    setIsInitialized: (state: AppState, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
  },
});

export const { setIsInitialized } = appSlice.actions;

export default appSlice.reducer;