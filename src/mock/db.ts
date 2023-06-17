import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import moment from 'moment'
import { IColumnItem } from '../type/column'
import { IDiaryItem } from '../type/diary'
import { IExerciseItem } from '../type/exercise'
import { IRecordItem } from '../type/record'
import { IUser } from '../type/user'

type Data = {
  users: IUser[],
  records: IRecordItem[],
  exercises: IExerciseItem[],
  diaries: IDiaryItem[],
  columns: IColumnItem[],
}
let now = moment();
let records: IRecordItem[] = Array.from(Array(30), (_, i): IRecordItem[] => {
  let d = moment().subtract(2 - i);
  return [
    { title: "Morning", date: d, image: `/images/m0${i % 3 + 1}.jpg` },
    { title: "Launch", date: d, image: `/images/l0${i % 3 + 1}.jpg` },
    { title: "Dinner", date: d, image: `/images/d0${i % 3 + 1}.jpg` },
    { title: "Snack", date: d, image: `/images/s0${i % 3 + 1}.jpg` },
  ]
}).flat();

let exercises: IExerciseItem[] = Array.from(Array(30), (_, i) => ({
  title: "家事全般（立位・軽い）",
  kcal: 26,
  time: 10,
}));

let diaries: IDiaryItem[] = Array.from(Array(30), (_, i) => ({
  title: "私の日記の記録が一部表示されます。",
  content: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  date: moment().subtract(i, 'd'),
}));

let columns: IColumnItem[] = Array.from(Array(30), (_, i) => ({
  title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ…",
  date: moment().subtract(i, 'd'),
  hashtags: ["魚料理", "和食", "DHA"],
  image: `/images/column-${i % 8 + 1}.jpg`
}));

const defaultData: Data = {
  users: [
    { id: 1, name: "User 1", username: "user1", password: "123456" },
    { id: 2, name: "User 2", username: "user2", password: "123456" },
  ],
  records: records,
  exercises: exercises,
  diaries: diaries,
  columns: columns,
}
const adapter = new JSONFile<Data>('src/mock/db.json')
const db = new Low<Data>(adapter, defaultData)

db.write();

export default db;