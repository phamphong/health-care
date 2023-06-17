import React, { useCallback } from 'react'
import { HexagonItem } from './hexagon-item';

import IconKnife from '../../image/icon_knife.png';
import IconCup from '../../image/icon_cup.png';
import { RecordItem } from './record-item';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store';
import { getRecordPaging, RecordState } from '../../features/record/recordSlice';
import moment from 'moment';

type IProps = {
} & React.PropsWithChildren;

export const MealHistory = (props: IProps) => {
  const { recordList, pageIndex, total, type } = useSelector<AppState, RecordState>((state) => state.recordReducer);
  const dispatch = useDispatch();
  const onLoadNextPage = useCallback(() => {
    dispatch(getRecordPaging({ pageIndex: pageIndex + 1, type }))
  }, [pageIndex, type]);

  const onFilterByType = useCallback((nextType: string) => {
    if (nextType === type) {
      return;
    }
    dispatch(getRecordPaging({ pageIndex: 1, type: nextType }));
  }, [pageIndex, type])

  return (
    <div className='flex flex-col p-2 items-stretch gap-2 text-base text-light' >
      <div className='flex justify-around my-6'>
        <HexagonItem onClick={() => onFilterByType("Morning")} icon={<Image {...IconKnife} alt="morning" />}>Morning</HexagonItem>
        <HexagonItem onClick={() => onFilterByType("Launch")} icon={<Image {...IconKnife} alt="launch" />}>Launch</HexagonItem>
        <HexagonItem onClick={() => onFilterByType("Dinner")} icon={<Image {...IconKnife} alt="dinner" />}>Dinner</HexagonItem>
        <HexagonItem onClick={() => onFilterByType("Snack")} icon={<Image {...IconCup} alt="snack" />}>Snack</HexagonItem>
      </div>
      <div className='grid  md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-2 mb-7'>
        {recordList.map((record, index) =>
          <RecordItem key={index} image={record.image} title={`${moment(record.date).format("MM.DD")} ${record.title}`} />
        )}
      </div>
      <div className='flex justify-center'>
        {recordList.length < total &&
          <button className='btn-common rounded text-light text-center py-3.5 text-lg'
            onClick={onLoadNextPage}
          >記録をもっと見る</button>
        }
      </div>
    </div>
  )
}
