import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'ui',
  initialState: {
    setting: {},
    isCartDrawer: false,
    isSigninDrawer: false,
    isFilterProductsDrawer: false,
    isMenuHeroDrawer: false,
  },
  reducers: {
    setSettingData: (ui, action) => {
      ui.setting = action.payload;
    },
    closeAllDrawers: ui => {
      ui.isCartDrawer = false;
      ui.isSigninDrawer = false;
      ui.isFilterProductsDrawer = false;
      ui.isMenuHeroDrawer = false;
    },
    setIsCartDrawer: (ui, { payload = true }) => {
      ui.isCartDrawer = payload;
    },
    setIsSigninDrawer: (ui, { payload = true }) => {
      ui.isSigninDrawer = payload;
    },
    setIsFilterProductsDrawer: (ui, { payload = true }) => {
      ui.isFilterProductsDrawer = payload;
    },
    setIsMenuHeroDrawer: (ui, { payload = true }) => {
      ui.isMenuHeroDrawer = payload;
    },
  },
});

export const {
  setSettingData,
  closeAllDrawers,
  setIsCartDrawer,
  setIsFilterProductsDrawer,
  setIsMenuHeroDrawer,
  setIsSigninDrawer,
} = slice.actions;

export default slice.reducer;
