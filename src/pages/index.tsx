import type { GetServerSideProps, NextPage } from 'next'
import { wrapper } from '../store'
import { MealHistory } from '../components/home/meal-history'
import { AchievementRate } from '../components/home/achievement-rate'
import moment from 'moment'
import { BodyWeightChart } from '../components/home/body-weight-chart'
import axios from 'axios'
import { setRecordList } from '../features/record/recordSlice'
import { authOptions } from './api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'


const IndexPage: NextPage = () => {

  return (
    <div >
      <div className='max-w-7xl m-auto flex flex-wrap md:flex-nowrap'>
        <AchievementRate start={moment("2023-06-11")} end={moment("2023-06-19")} />
        <BodyWeightChart />
      </div>
      <div className='wrapper m-auto'>
        <MealHistory />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log(session?.user);
  if (!session?.user) {
    return {
      redirect: { destination: "/login", permanent: false },
      props: {}
    }
  }
  let recordList = await axios.post("http://localhost:3000/api/record", {
    pageSize: 8,
    pageIndex: 1,
  });
  store.dispatch(setRecordList(recordList.data));
  return {
    props: {
    }
  }
});

export default IndexPage
