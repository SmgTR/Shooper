import { store } from 'redux/store';

import { FormEvent } from 'react';

import { logInStaff } from 'redux/services/auth';

export const logIn = (
  event: FormEvent,
  userCredentials: { username: string; email: string; password: string }
) => {
  event.preventDefault();
  store.dispatch(logInStaff(userCredentials));
};
