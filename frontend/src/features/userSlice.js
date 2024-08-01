import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";


export const addUserApi = createAsyncThunk(
    'user/addUser',
    async (formData, {rejectWithValue}) => {
        try {
            const response = await axios.post('http://localhost:8000/users', formData);
            console.log(response)
            return response
            
           
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    } 
)


const initialState = {
    users: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            const user = {
                id: nanoid(),
                user: action.payload.name,
                collegeName: action.payload.collegeName,
                round1Marks: action.payload.round1Marks,
                round2Marks: action.payload.round2Marks,
                round3Marks: action.payload.round3Marks,
                techMarks: action.payload.techMarks
            }
            state.users.push(user);
        }
    }
});


export const { addUser } = userSlice.actions

export default userSlice.reducer;