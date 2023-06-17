import { Moment } from "moment"

export type IPagingRequest = {
  pageSize: number,
  pageIndex: number,
}

export type IPagingResponse<T> = {
  pageSize: number,
  pageIndex: number,
  data: T[],
  total: number,
}