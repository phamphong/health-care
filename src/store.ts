import { configureStore, ThunkAction, Action, combineReducers, AnyAction, Reducer } from '@reduxjs/toolkit'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'

import recordReducer from './features/record/recordSlice'
import exerciseReducer from './features/exercise/exerciseSlice'
import diaryReducer from './features/diary/diarySlice'
import columnReducer from './features/column/columnSlice'

const combinedReducer = combineReducers({
  recordReducer,
  exerciseReducer,
  diaryReducer,
  columnReducer,
});

export type AppState = ReturnType<typeof combinedReducer>;

const reducer = (state: AppState | undefined, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState: AppState = {
      ...state,
      ...action.payload
    }
    return nextState;
  } else {
    return combinedReducer(state, action) as AppState;
  }
}

export function makeStore() {
  return configureStore({
    reducer
  })
}

export type AppStore = ReturnType<typeof makeStore>;

export type AppDispatch = AppStore['dispatch'];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export const wrapper = createWrapper<AppStore>(makeStore);