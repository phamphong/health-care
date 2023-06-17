import moment from 'moment';
import { useSelector } from 'react-redux';
import { ExerciseState } from '../../features/exercise/exerciseSlice';
import { AppState } from '../../store';
import { IExerciseItem } from '../../type/exercise';

export const MyExercise = () => {
  let now = moment();

  const { exerciseList } = useSelector<AppState, ExerciseState>((state) => state.exerciseReducer);

  return (
    <div className='bg-dark-600 p-4'>
      <div className='flex'>
        <div id="my-exercise" className='text-light text-15 w-20'>MY EXERCISE</div>
        <div className='text-light text-22'>{now.format("YYYY.MM.DD")}</div>
      </div>
      <div className='max-h-48 overflow-y-auto mt-1'>
        <div className='grid grid-cols-2 gap-x-10 gap-y-2'>
          {exerciseList.map((e, i) =>
            <ExerciseItem data={e} key={i} />
          )}
        </div>
      </div>
    </div>
  )
}

const ExerciseItem = (props: { data: IExerciseItem }) => {
  return (
    <div className='exercise-item p-0.5 flex justify-between'>
      <div>
        <div className='text-light text-15'>{props.data.title}</div>
        <div className='text-primary-300 text-15'>{props.data.kcal}kcal</div>
      </div>
      <div className='text-primary-300 text-lg font-normal'>{props.data.time} min</div>
    </div>
  )
}