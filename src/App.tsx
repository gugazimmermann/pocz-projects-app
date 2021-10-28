import { lazy, ReactElement, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthRoutes } from './routes';
import Loading from './components/loading/Loading';
import AuthLayout from './pages/auth/pages/layout/Layout';
import SignIn from './pages/auth/pages/sign-in/SignIn';

const ForgotPassword = lazy(
  () => import('./pages/auth/pages/forgot-password/ForgotPassword'),
);
const ChangePassword = lazy(
  () => import('./pages/auth/pages/change-password/ChangePassword'),
);
const SignUp = lazy(() => import('./pages/auth/pages/sign-up/SignUp'));
const Plans = lazy(() => import('./pages/auth/pages/plans/Plans'));
const Subscription = lazy(
  () => import('./pages/auth/pages/subscription/Subscription'),
);

function App(): ReactElement {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <AuthLayout>
              <SignIn />
            </AuthLayout>
          )}
        />
        <Route
          exact
          path={AuthRoutes.SignIn}
          render={() => (
            <AuthLayout>
              <SignIn />
            </AuthLayout>
          )}
        />
        <Route
          exact
          path={AuthRoutes.ForgotPassword}
          render={() => (
            <AuthLayout>
              <ForgotPassword />
            </AuthLayout>
          )}
        />
        <Route
          exact
          path={`${AuthRoutes.ChangePassword}/:urlcode?`}
          render={() => (
            <AuthLayout>
              <ChangePassword />
            </AuthLayout>
          )}
        />
        <Route
          exact
          path={AuthRoutes.SignUp}
          render={() => (
            <AuthLayout>
              <SignUp />
            </AuthLayout>
          )}
        />
        <Route
          exact
          path={AuthRoutes.Plans}
          render={() => (
            <AuthLayout>
              <Plans />
            </AuthLayout>
          )}
        />
        <Route
          exact
          path={AuthRoutes.Subscription}
          render={() => (
            <AuthLayout>
              <Subscription />
            </AuthLayout>
          )}
        />
      </Switch>
    </Suspense>
  );
}

export default App;
