import { createSlice } from '@reduxjs/toolkit';

const initialState: UserState = {
  data: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (user, action) => {
      user.data = action.payload;
    },
  },
});

export const { setUserData } = slice.actions;

export default slice.reducer;
