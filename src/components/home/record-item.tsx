import React from 'react'

type IRecordItem = {
  image: string,
  title: string,
};

export const RecordItem = (props: IRecordItem) => {
  return (
    <div className='record-item'>
      <div className='w-full pt-[100%] relative' >
        <img src={props.image} className="absolute top-0 left-0 w-full h-full object-cover" alt={props.title} />
        <div className='absolute bottom-0 left-0 w-[120px] bg-primary-300 text-light pl-2 py-1'>{props.title}</div>
      </div>
    </div>
  )
}
