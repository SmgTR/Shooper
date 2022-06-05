import { ChangeEvent, FC, useState, useEffect, FormEvent } from 'react';

import login from 'Assets/login.svg';

import { Button } from 'Components';

import styles from './Login.module.scss';

import { useAppDispatch, useAppSelector } from 'redux/hooks';

import { useNavigate } from 'react-router-dom';
import { logInStaff } from 'redux/services/auth';

const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector((state) => state.auth.isLogged);

  const [userCredentials, setUserCredentials] = useState({
    username: '',
    email: '',
    password: ''
  });

  const credentialsHandler = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setUserCredentials((state) => {
      return { ...state, [target.name]: target.value };
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(logInStaff(userCredentials));
  };

  const goToMain = () => {
    return navigate('/', { replace: true });
  };

  const token = localStorage.getItem('auth');

  useEffect(() => {
    if (isLogged && token) goToMain();
  }, [isLogged, token]);

  return (
    <div className={styles.login}>
      <img src={login} alt="login logo" />
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username">
          <i className="fa-solid fa-user"></i>
          <input
            type="text"
            name="username"
            title="username"
            value={userCredentials.username}
            placeholder="Nazwa użytkownika"
            onChange={credentialsHandler}
            autoComplete="off"
          />
        </label>
        <label htmlFor="email">
          <i className="fa-solid fa-at"></i>
          <input
            type="text"
            name="email"
            title="email"
            value={userCredentials.email}
            onChange={credentialsHandler}
            placeholder="Email"
            autoComplete="off"
          />
        </label>
        <label htmlFor="password">
          <i className="fa-solid fa-key"></i>
          <input
            type="password"
            name="password"
            title="pass"
            onChange={credentialsHandler}
            placeholder="Hasło"
            autoComplete="off"
          />
        </label>
        <Button text="Zaloguj" title="zaloguj" btnClass="--main" btnType="submit" />
      </form>
    </div>
  );
};

export default Login;
