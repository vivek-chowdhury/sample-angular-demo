import * as fromRoot from '../../../state/iapp.state';

export interface ILoginState extends fromRoot.IAppState {
  rememberMe: boolean;
}
