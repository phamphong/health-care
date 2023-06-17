import type { GetServerSideProps, NextPage } from 'next'
import { wrapper } from '../store'
import { SectionButton } from '../components/my-record/section-button'
import { BodyRecordChart } from '../components/my-record/body-record-chart'
import { MyExercise } from '../components/my-record/my-exercise'
import { MyDiary } from '../components/my-record/my-diary'
import axios from 'axios'
import { setExerciseList } from '../features/exercise/exerciseSlice'
import { setDiaryList } from '../features/diary/diarySlice'
import { authOptions } from './api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'


const MyRecord: NextPage = () => {

  return (
    <div className='wrapper m-auto pt-14'>
      <div className='grid grid-cols-3 gap-4 sm:gap-6 md:gap-12 mb-14'>
        <SectionButton
          title='BODY RECORD'
          subtitle='自分のカラダの記録'
          href='#body-record'
          image="/images/MyRecommend-1.jpg"
        />
        <SectionButton
          title='MY EXERCISE'
          subtitle='自分の運動の記録'
          href='#my-exercise'
          image="/images/MyRecommend-2.jpg"
        />
        <SectionButton
          title='MY DIARY'
          subtitle='自分の日記'
          href='#my-diary'
          image="/images/MyRecommend-3.jpg"
        />
      </div>
      <div className='flex flex-col gap-14'>
        <BodyRecordChart />
        <MyExercise />
        <MyDiary />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session?.user) {
    return {
      redirect: { destination: "/login", permanent: false },
      props: {}
    }
  }
  let exerciseList = await axios.post("http://localhost:3000/api/exercise", {
    pageSize: 30,
    pageIndex: 1,
  });
  let diaryList = await axios.post("http://localhost:3000/api/diary", {
    pageSize: 8,
    pageIndex: 1,
  });
  store.dispatch(setExerciseList(exerciseList.data));
  store.dispatch(setDiaryList(diaryList.data));
  return {
    props: {
    }
  }
});

export default MyRecord
