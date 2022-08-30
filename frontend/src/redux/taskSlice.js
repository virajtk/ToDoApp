import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    activeTask: null,
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTask: ( state, action) => {
            state.activeTask = action.payload.task
        },
        deleteTask: (state) => {
            state.activeTask = null
        }
    },
})

export const {setTask, deleteTask} = taskSlice.actions;

export const selectActiveTask = state => state.task.activeTask;

export default taskSlice.reducer;

