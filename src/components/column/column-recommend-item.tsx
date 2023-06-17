
type IProps = {
  title: string,
  subtitle: string,
}

export const ColumnRecommendItem = ({ title, subtitle }: IProps) => {
  return (
    <div className="w-full h-36 bg-dark-600 flex flex-col items-center justify-center gap-2">
      <div className="text-22 text-primary-300 font-normal text-center">{title}</div>
      <div className="w-14 border-b-1 border-light" />
      <div className="text-lg text-light  text-center">{subtitle}</div>
    </div>
  )
}