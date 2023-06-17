import moment, { Moment } from "moment"
import { useMemo } from "react";

type IProps = {
  start: Moment,
  end: Moment,
}

const width = Math.PI * 90 * 2;

export const AchievementRate = (props: IProps) => {
  let now = moment();
  let diffStartEnd = props.start.diff(props.end, 'd');
  let diffStartNow = props.start.diff(now, 'd');
  let percent = Math.round(diffStartNow / diffStartEnd * 100);
  let dash = percent / 100 * width;

  return (
    <div className="achievement-rate flex justify-center items-center flex-1 md:w-[540px]">
      <div className="rate-circle relative">
        <svg viewBox="0 0 200 200" width="100%" height="100%" className="circular-chart">
          <circle className="circle" cx="100" cy="100" r="90" strokeDasharray={`${dash} ${width - dash}`} />
        </svg>
        <div className="flex items-center absolute top-0 left-0 bottom-0 right-0 justify-center">
          <div className="flex gap-1 items-baseline">
            <span className="date text-light font-normal text-lg">{now.format("MM/DD")}</span>
            <span className="percent text-light font-normal">{percent}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}