import React from 'react'

type IHexagonItemProps = {
  icon: React.ReactNode,
  onClick: () => void
} & React.PropsWithChildren;

export const HexagonItem = (props: IHexagonItemProps) => {
  return (
    <div onClick={props.onClick} className='hexagon flex flex-col p-2 items-center justify-center text-light text-xl font-normal' >
      {props.icon}
      {props.children}
    </div>
  )
}
