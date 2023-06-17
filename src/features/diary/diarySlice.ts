import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { IPagingResponse } from '../../type/paging'
import { IDiaryItem } from '../../type/diary'

export interface DiaryState {
  diaryList: IDiaryItem[],
  pageIndex: number,
  pageSize: number,
  total: number,
}

const initialState: DiaryState = {
  diaryList: [],
  pageIndex: 1,
  pageSize: 8,
  total: 0,
}

export const getDiaryPaging = createAsyncThunk(
  'diary/get',
  async (pageIndex: number) => {
    const res = await axios.post("/api/diary", {
      pageIndex,
      pageSize: 8
    });
    return res.data;
  }
)

export const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {
    setDiaryList: (state, action: PayloadAction<IPagingResponse<IDiaryItem>>) => {
      let { pageIndex, data, total } = action.payload;
      state.diaryList = data;
      state.total = pageIndex;
      state.total = total;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDiaryPaging.fulfilled, (state, action: PayloadAction<IPagingResponse<IDiaryItem>>) => {
      let { pageIndex, data, total } = action.payload;
      if (pageIndex === 1) {
        state.diaryList = data
      } else {
        state.diaryList = [...state.diaryList, ...data];
      }
      state.pageIndex = pageIndex;
      state.total = total;
    });
  }
})

export const { setDiaryList } = diarySlice.actions

export default diarySlice.reducer