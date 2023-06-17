import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
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

export const BodyWeightChart = () => {

  return (<div className='flex-1 bg-dark-600 p-4 inline-flex justify-center'>
    <Line
      style={{ height: 284 }}
      options={options}
      data={data}
    />
  </div>)
}