import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from '@reduxjs/toolkit/dist/createAction';
import {PageMetadata} from '../../data/type/index';

export type AppState = {
  isInitialized: boolean;
  pageMetadata: PageMetadata;
};

export const appSlice = createSlice({
  name: 'app',
  initialState: <AppState>{
    isInitialized: false,
    pageMetadata: {title: ''},
  },
  reducers: {
    setIsInitialized: (state: AppState, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    setPageMetadata: (state: AppState, action: PayloadAction<PageMetadata>) => {
      state.pageMetadata = action.payload;
    },
  },
});

export const {setIsInitialized, setPageMetadata} = appSlice.actions;

export default appSlice.reducer;
