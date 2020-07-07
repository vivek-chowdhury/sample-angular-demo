import { createAction, props } from '@ngrx/store';

export interface IButtonAction {
  isAddTaskVisible: boolean;
  isLogoutRequired: boolean;
}

export const headerToggleButtonState = createAction(
  '[HEADER] Toggling button state',
  props<{ button: IButtonAction }>()
);
