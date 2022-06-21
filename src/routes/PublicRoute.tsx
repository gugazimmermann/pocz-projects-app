/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { UserRes } from '@interfaces';
import { AppRoutes } from '@routes';
import { AuthServices } from '@services';

export function PublicRoute({ children, ...rest }: RouteProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({} as UserRes);

  async function currentUser() {
    try {
      const me = (await AuthServices.getMe()) as UserRes;
      setUser(me);
      setLoading(false);
    } catch (err) {
      AuthServices.logout();
      setLoading(false);
    }
  }

  useEffect(() => {
    currentUser();
  }, []);

  return (
    <div>
      {loading ? null : !user.email ? (
        <Route {...rest} render={() => children} />
      ) : (
        <Redirect to={AppRoutes.Dashboards} />
      )}
    </div>
  );
}

export default PublicRoute;
