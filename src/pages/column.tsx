import type { GetServerSideProps, NextPage } from 'next'
import { AppState, wrapper } from '../store'
import { ColumnRecommendItem } from '../components/column/column-recommend-item'
import { ColumnItem } from '../components/column/column-item'
import moment from 'moment'
import axios from 'axios'
import { ColumnState, getColumnPaging, setColumnList } from '../features/column/columnSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'

const ColumnPage: NextPage = () => {

  const { columnList, pageIndex, total } = useSelector<AppState, ColumnState>((state) => state.columnReducer);
  const dispatch = useDispatch();
  const onLoadNextPage = useCallback(() => {
    dispatch(getColumnPaging(pageIndex + 1))
  }, [pageIndex]);

  return (
    <div className='wrapper m-auto pt-14'>
      <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8 mb-14'>
        <ColumnRecommendItem
          title='RECOMMENDED COLUMN'
          subtitle='オススメ'
        />
        <ColumnRecommendItem
          title='RECOMMENDED DIET'
          subtitle='ダイエット'
        />
        <ColumnRecommendItem
          title='RECOMMENDED BEAUTY'
          subtitle='美容'
        />
        <ColumnRecommendItem
          title='RECOMMENDED HEALTH'
          subtitle='健康'
        />
      </div>
      <div className='grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-x-2 gap-y-4'>
        {columnList.map((k, i) =>
          <ColumnItem key={i}
            title={k.title}
            date={moment(k.date)}
            hashtags={k.hashtags}
            image={k.image}
          />
        )}
      </div>
      <div className='flex justify-center mt-7'>
        {columnList.length < total &&
          <button onClick={onLoadNextPage} className='btn-common rounded text-light text-center py-3.5 text-lg'>コラムをもっと見る</button>
        }
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {

  let columnList = await axios.post("http://localhost:3000/api/column", {
    pageSize: 8,
    pageIndex: 1,
  });
  store.dispatch(setColumnList(columnList.data));
  return {
    props: {
    }
  }
});

export default ColumnPage
