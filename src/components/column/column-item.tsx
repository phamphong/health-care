import { Moment } from 'moment';
import Link from 'next/link';
import React from 'react'

type IColumnItem = {
  image: string,
  title: string,
  date: Moment,
  hashtags: string[],
};

export const ColumnItem = (props: IColumnItem) => {
  return (
    <div className='record-item'>
      <div className='w-full pt-[60%] relative' >
        <img src={props.image} className="absolute top-0 left-0 w-full h-full object-cover" alt={props.title} />
        <div className='absolute bottom-0 left-0 w-36 bg-primary-300 text-light pl-2 py-1'>{props.date.format("YYYY.MM.DD  HH:mm")}</div>
      </div>
      <div className='text-15 line-clamp-2'>{props.title}</div>
      <div className='flex gap-2'>{props.hashtags.map((k, i) =>
        <Link href={`#${k}`} key={i}><div className='text-primary-300'>#{k}</div></Link>
      )}</div>
    </div>
  )
}
