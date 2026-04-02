import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "User",
  initialState: {
    name: localStorage.getItem("User") || ""  // ← reload pe bhi rehega
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload;
      localStorage.setItem("User", action.payload);  // ← save karo
    },
    clearUser: (state) => {
      state.name = "";
      localStorage.removeItem("User");  // ← logout pe hatao
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;