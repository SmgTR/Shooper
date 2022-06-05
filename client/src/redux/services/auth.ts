/* eslint-disable @typescript-eslint/indent */
import { gql } from '@apollo/client';
import { setLoggedIn, setUser } from 'redux/slices/auth-slice';

const GET_LOGGED_IN = gql`
  query {
    LoggedIn {
      _id
      username
      role
    }
  }
`;

const LOG_IN = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    LogInStaffUser(
      staffCredentials: { username: $username, email: $email, password: $password }
    ) {
      accessToken
      _id
    }
  }
`;

export const getLoggedIn =
  () =>
  async (dispatch: any, _: any, { client }: any) => {
    return client
      .query('LoggedIn', GET_LOGGED_IN)
      .then((data: any) => {
        dispatch(setLoggedIn(true));
        console.log({ data }, 'here');
      })
      .catch((e: string) => {
        console.log(e);
        dispatch(setLoggedIn(false));
        return dispatch(setUser({}));
      });
  };

export const logInStaff =
  (staffCredentials: { username: String; password: String; email: String }) =>
  async (dispatch: any, _: any, { client }: any) => {
    return client
      .mutate('LogInStaffUser', LOG_IN, { ...staffCredentials })
      .then((data: any) => {
        // dispatch(logIn(staffCredentials));
        localStorage.setItem('auth', data.accessToken);
        dispatch(setUser(data));
        dispatch(setLoggedIn(true));
        return data;
      })
      .catch((e: any) => console.log(e, 'login'));
  };
