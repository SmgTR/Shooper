import { Navigate } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getLoggedIn } from 'redux/services/auth';

const ProtectedRoute: FC<any> = ({ children }) => {
  const user = useAppSelector((state) => state.auth.isLogged);
  const dispatch = useAppDispatch();

  const token = localStorage.getItem('auth');

  const [loading, setLoading] = useState(true);
  const verify = async () => {
    await dispatch(getLoggedIn());
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      verify();
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
