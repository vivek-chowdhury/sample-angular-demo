import * as IAppState from '../../../state/iapp.state';

export interface IHeaderState {
  logout: ILogout;
  homeOptions: IHomeOptions;
}

export interface ILogout {
  isVisible: boolean;
}

export interface IHomeOptions {
  isAddTaskVisible: boolean;
}

export const initialHeaderState: IHeaderState = {
  homeOptions: {
    isAddTaskVisible: false,
  },
  logout: {
    isVisible: false,
  },
};
