import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { IPagingResponse } from '../../type/paging'
import { IExerciseItem } from '../../type/exercise'

export interface ExerciseState {
  exerciseList: IExerciseItem[],
  pageIndex: number,
  pageSize: number,
  total: number,
}

const initialState: ExerciseState = {
  exerciseList: [],
  pageIndex: 1,
  pageSize: 8,
  total: 0,
}

export const getExercisePaging = createAsyncThunk(
  'exercise/get',
  async (pageIndex: number) => {
    const res = await axios.post("/api/exercise", {
      pageIndex,
      pageSize: 8
    });
    return res.data;
  }
)

export const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {
    setExerciseList: (state, action: PayloadAction<IPagingResponse<IExerciseItem>>) => {
      let { pageIndex, data, total } = action.payload;
      state.exerciseList = data;
      state.total = pageIndex;
      state.total = total;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getExercisePaging.fulfilled, (state, action: PayloadAction<IPagingResponse<IExerciseItem>>) => {
      let { pageIndex, data, total } = action.payload;
      if (pageIndex === 1) {
        state.exerciseList = data
      } else {
        state.exerciseList = [...state.exerciseList, ...data];
      }
      state.pageIndex = pageIndex;
      state.total = total;
    });
  }
})

export const { setExerciseList } = exerciseSlice.actions

export default exerciseSlice.reducer