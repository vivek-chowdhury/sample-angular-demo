import { createReducer, on, createAction } from '@ngrx/store';
import { IHomeState } from './ihome.state';

const initialHomeState: IHomeState = {
  tasks: [],
  selectedTask: null,
};
export const homeReducer = createReducer<IHomeState>(
  initialHomeState,
  on(
    createAction(
      '[HOME SCREEN] Reducer',
      (state): IHomeState => {
        return {
          ...state,
        };
      }
    )
  )
);
