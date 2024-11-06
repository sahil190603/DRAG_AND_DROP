import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usertaskRequests: null,
};

export const taskRequestsSlice = createSlice({
  name: "taskRequestData",
  initialState,
  reducers: {
    setUsertaskRequests: (state, action) => {
      state.usertaskRequests = action.payload;
    },
    removeData(state, action) {
      return { usertaskRequests: null };
    },
  },
});

export const { setUsertaskRequests, removeData } = taskRequestsSlice.actions;
export default taskRequestsSlice.reducer;
