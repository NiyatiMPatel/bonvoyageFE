import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UserLoginState {
  isLoggedIn: boolean;
}

// Define the initial state using that type
const initialState: UserLoginState = {
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

// ACTION FUNCTION TO UPDATE THE STATE
export const { setLoggedIn } = userSlice.actions;
// REDUCERS TO ACCESS
export default userSlice.reducer;
