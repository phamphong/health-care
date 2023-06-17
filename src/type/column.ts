import { Moment } from "moment"

export type IColumnItem = {
  title: string,
  image: string,
  date: Moment,
  hashtags: string[],
}