import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  birthDate: string;
  gender: string;
  email: string;
  [key: string]: any; 
}

interface UserState {
  data: UserData[]; 
  delCount:number;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: [],
  delCount:0,
  loading: false,
  error: null,
};


export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
  const response = await fetch('https://dummyjson.com/users');
  const jsonData = await response.json();
  return jsonData.users; 
});


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    deleteUser: (state, action) => {
      state.data = state.data.filter((user) => user.email !== action.payload);
    },
    deleteCount:(state)=>{state.delCount=state.delCount+1}
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; 
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { deleteUser,deleteCount } = userSlice.actions;
export default userSlice.reducer;
