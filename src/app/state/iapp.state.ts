import { IHeaderState } from '../core/header/state/iheader.state';

export interface IAppState {
  header?: IHeaderState;
  user?: IUserDetail;
}

export interface IUserDetail {
  userName: string;
  password: string;
}
