import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import moment from 'moment';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.defaults.backgroundColor = '#2E2E2E';

export const options = {
  responsive: true,
  scales: {
    y: {
      display: false
    },
    x: {
      ticks: {
        color: "white",
        stepSize: 1,
        backdropColor: "white"
      },
      grid: {
        color: "#777777"
      }
    }
  },
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: false,
    },
  },
};

const labels = [6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5];

const data = {
  labels: labels.map(l => l + " 月"),
  datasets: [
    {
      label: 'Body Weight',
      data: labels.map((l) => l + 50),
      borderColor: '#FFCC21',
      backgroundColor: '#FFCC21',
    },
    {
      label: 'Body Fat',
      data: labels.map((l) => l + 50 + Math.round(Math.random() * 10) - 5),
      borderColor: '#FFFFFF',
      backgroundColor: '#FFFFFF',
    },
  ],
};

export const BodyRecordChart = () => {
  let now = moment();

  return (
    <div className='bg-dark-600 p-4'>
      <div className='flex'>
        <div id="body-record" className='text-light text-15 w-20'>BODY RECORD</div>
        <div className='text-light text-22'>{now.format("YYYY.MM.DD")}</div>
      </div>
      <Line
        style={{ height: 284 }}
        options={options}
        data={data}
      />
      <div className='flex gap-4 mt-2'>
        <button className='bg-light text-primary-300 rounded-xl w-14' >日</button>
        <button className='bg-light text-primary-300 rounded-xl w-14'>週</button>
        <button className='bg-light text-primary-300 rounded-xl w-14'>月</button>
        <button className='bg-primary-300 text-light rounded-xl w-14'>年</button>
      </div>
    </div>
  )
}