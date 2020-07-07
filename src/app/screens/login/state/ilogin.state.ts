import * as fromRoot from '../../../state/iapp.state';

export interface ILoginState extends fromRoot.IAppState {
  rememberMe: boolean;
  user?: IUserDetail;
}

export interface IUserDetail {
  userName: string;
  password: string;
  rememberMe: boolean;
}
