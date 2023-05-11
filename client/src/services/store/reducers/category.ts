import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: CategoryState = {
  list: [],
};

const slice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategoryList: (state, action: PayloadAction<string[]>) => {
      // No dublicate items in array
      const categoryList = Array.from(new Set(action.payload));

      state.list = categoryList;
    },
    generalDataRest: () => {
      return initialState;
    },
  },
});

export const { setCategoryList } = slice.actions;

export default slice.reducer;
