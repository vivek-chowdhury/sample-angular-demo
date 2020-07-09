import * as IAppState from '../../../state/iapp.state';

export enum SCREENTYPES {
  HOME_SCREEN = 'HOME_SCREEN',
  LOGIN_SCREEN = 'LOGIN_SCREEN',
  ABOUT_SCREEN = 'ABOUT_SCREEN',
  CONTACTUS_SCREEN = 'CONTACTUS_SCREEN',
}

export interface IHeaderState {
  screenType: SCREENTYPES;
  isUserLoggedIn: boolean;
}

export const initialHeaderState: IHeaderState = {
  screenType: SCREENTYPES.LOGIN_SCREEN,
  isUserLoggedIn: false,
};
