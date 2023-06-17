import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { IPagingResponse } from '../../type/paging'
import { IRecordItem } from '../../type/record'

export interface RecordState {
  recordList: IRecordItem[],
  pageIndex: number,
  pageSize: number,
  total: number,
  type?: string | null,
}

const initialState: RecordState = {
  recordList: [],
  pageIndex: 1,
  pageSize: 8,
  total: 0,
  type: null
}

export const getRecordPaging = createAsyncThunk(
  'record/get',
  async ({ pageIndex, type }: { pageIndex: number, type?: string | null }) => {
    const res = await axios.post("/api/record", {
      pageIndex,
      type,
      pageSize: 8
    });
    return { ...res.data, type };
  }
)

export const recordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {
    setRecordList: (state, action: PayloadAction<IPagingResponse<IRecordItem>>) => {
      let { pageIndex, data, total } = action.payload;
      state.recordList = data;
      state.total = pageIndex;
      state.total = total;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRecordPaging.fulfilled, (state, action: PayloadAction<IPagingResponse<IRecordItem> & { type?: string | null }>) => {
      let { pageIndex, data, total, type } = action.payload;
      if (pageIndex === 1) {
        state.recordList = data
      } else {
        state.recordList = [...state.recordList, ...data];
      }
      state.pageIndex = pageIndex;
      state.total = total;
      state.type = type;
    });
  }
})

export const { setRecordList } = recordSlice.actions

export default recordSlice.reducer