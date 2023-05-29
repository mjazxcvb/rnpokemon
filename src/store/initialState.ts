import {AppState} from '../interfaces';
export const initialState: AppState = {
  users: [
    {
      email: 'test@gmail.com',
      password: '123456',
    },
  ],
  loggedInUser: null,
};
