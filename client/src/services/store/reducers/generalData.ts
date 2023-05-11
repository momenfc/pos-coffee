import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: GeneralDataState = {
  lastOrder: null,
  isOrderToCopy: false,
};

const slice = createSlice({
  name: 'generalData',
  initialState,
  reducers: {
    generalDataUpdate: (state, action: PayloadAction<GeneralDataPayload>) => {
      const newState = { ...state, ...action.payload };
      if (action.payload.lastOrder) {
        newState.isOrderToCopy = true;
      }
      return newState;
    },
    generalDataRest: () => {
      return initialState;
    },
  },
});

export const { generalDataUpdate, generalDataRest } = slice.actions;

export default slice.reducer;
