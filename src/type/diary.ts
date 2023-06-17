import { Moment } from "moment"

export type IDiaryItem = {
  title: string,
  content: string,
  date: Moment,
}