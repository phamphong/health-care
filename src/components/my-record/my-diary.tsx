import moment from 'moment';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DiaryState, getDiaryPaging } from '../../features/diary/diarySlice';
import { AppState } from '../../store';
import { IDiaryItem } from '../../type/diary';

export const MyDiary = () => {
  const { diaryList, pageIndex, total } = useSelector<AppState, DiaryState>((state) => state.diaryReducer);
  const dispatch = useDispatch();
  const onLoadNextPage = useCallback(() => {
    dispatch(getDiaryPaging(pageIndex + 1))
  }, [pageIndex]);
  return (
    <div>
      <div className='flex'>
        <div id="my-diary" className='text-22'>MY DIARY</div>
      </div>
      <div className='grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
        {diaryList.map((diary, i) =>
          <DiaryItem key={i} data={diary} />
        )}
      </div>
      <div className='flex justify-center mt-7'>
        {diaryList.length < total &&
          <button onClick={onLoadNextPage} className='btn-common rounded text-light text-center py-3.5 text-lg'>自分の日記をもっと見る</button>
        }
      </div>
    </div>
  )
}

const DiaryItem = (props: { data: IDiaryItem }) => {
  let { data: { title, content, date } } = props;
  let m = moment(date);
  return (
    <div className='diary-item p-4'>
      <div className='text-lg text-dark-500 font-normal'>{m.format("YYYY.MM.DD")}</div>
      <div className='text-lg text-dark-500 font-normal'>{m.format("HH:mm")}</div>
      <div className='text-xs text-dark-500'>{title}</div>
      <div className='text-xs text-dark-500 line-clamp-5'>{content}</div>
    </div>
  )
}