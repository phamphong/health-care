import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { IPagingResponse } from '../../type/paging'
import { IColumnItem } from '../../type/column'

export interface ColumnState {
  columnList: IColumnItem[],
  pageIndex: number,
  pageSize: number,
  total: number,
}

const initialState: ColumnState = {
  columnList: [],
  pageIndex: 1,
  pageSize: 8,
  total: 0,
}

export const getColumnPaging = createAsyncThunk(
  'column/get',
  async (pageIndex: number) => {
    const res = await axios.post("/api/column", {
      pageIndex,
      pageSize: 8
    });
    return res.data;
  }
)

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    setColumnList: (state, action: PayloadAction<IPagingResponse<IColumnItem>>) => {
      let { pageIndex, data, total } = action.payload;
      state.columnList = data;
      state.total = pageIndex;
      state.total = total;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getColumnPaging.fulfilled, (state, action: PayloadAction<IPagingResponse<IColumnItem>>) => {
      let { pageIndex, data, total } = action.payload;
      if (pageIndex === 1) {
        state.columnList = data
      } else {
        state.columnList = [...state.columnList, ...data];
      }
      state.pageIndex = pageIndex;
      state.total = total;
    });
  }
})

export const { setColumnList } = columnSlice.actions

export default columnSlice.reducer