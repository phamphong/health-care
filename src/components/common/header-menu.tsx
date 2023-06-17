import React from 'react'

export const HeaderMenu = (props: React.PropsWithChildren) => {
  return (
    <div className='flex items-center' >
      {props.children}
    </div>
  )
}

type IHeaderMenuItemProps = {
  notiCount?: number,
  icon: React.ReactNode
} & React.PropsWithChildren;

export const HeaderMenuItem = (props: IHeaderMenuItemProps) => {
  return (
    <div className='p-2 items-center gap-2 text-base flex' >
      <div className='relative' >
        {!!props.notiCount &&
          <div className='absolute rounded-xl bg-primary-500 text-light w-4 h-4 top-0 -right-2 text-xxs text-center leading-3 flex items-center justify-center'>{props.notiCount}</div>
        }
        {props.icon}
      </div>
      <div className='hidden md:block'>
        {props.children}
      </div>
    </div>
  )
}
