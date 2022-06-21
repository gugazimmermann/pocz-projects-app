import { lazy, ReactElement, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Loading } from '@components';
import {
  AuthRoutes, AppRoutes, CommonRoutes, PublicRoute,
} from '@routes';
import AuthLayout from './pages/auth/pages/layout/Layout';
import SignIn from './pages/auth/pages/sign-in/SignIn';
import ProtectedRoute from './routes/ProtectedRoute';
import Layout from './pages/layout/Layout';

const NotFound = lazy(() => import('./pages/not-found/NotFound'));
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
const Dashboards = lazy(() => import('./pages/dashboards/Dashboards'));
const Profile = lazy(() => import('./pages/profile/Profile'));
const Subscriptions = lazy(() => import('./pages/subscriptions/Subscriptions'));
const Places = lazy(() => import('./pages/places/Places'));
const Members = lazy(() => import('./pages/members/Members'));
const Persons = lazy(() => import('./pages/persons/Persons'));

function App(): ReactElement {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <PublicRoute>
              <AuthLayout>
                <SignIn />
              </AuthLayout>
            </PublicRoute>
          )}
        />
        <Route
          exact
          path={AuthRoutes.SignIn}
          render={() => (
            <PublicRoute>
              <AuthLayout>
                <SignIn />
              </AuthLayout>
            </PublicRoute>
          )}
        />
        <Route
          exact
          path={AuthRoutes.ForgotPassword}
          render={() => (
            <PublicRoute>
              <AuthLayout>
                <ForgotPassword />
              </AuthLayout>
            </PublicRoute>
          )}
        />
        <Route
          exact
          path={`${AuthRoutes.ChangePassword}/:urlcode?`}
          render={() => (
            <PublicRoute>
              <AuthLayout>
                <ChangePassword />
              </AuthLayout>
            </PublicRoute>
          )}
        />
        <Route
          exact
          path={AuthRoutes.SignUp}
          render={() => (
            <PublicRoute>
              <AuthLayout>
                <SignUp />
              </AuthLayout>
            </PublicRoute>
          )}
        />
        <Route
          exact
          path={AuthRoutes.Plans}
          render={() => (
            <PublicRoute>
              <AuthLayout>
                <Plans />
              </AuthLayout>
            </PublicRoute>
          )}
        />
        <Route
          exact
          path={AuthRoutes.Subscription}
          render={() => (
            <PublicRoute>
              <AuthLayout>
                <Subscription />
              </AuthLayout>
            </PublicRoute>
          )}
        />

        <Route
          exact
          path={AppRoutes.Dashboards}
          render={() => (
            <ProtectedRoute>
              <Layout>
                <Dashboards />
              </Layout>
            </ProtectedRoute>
          )}
        />
        <Route
          exact
          path={`${AppRoutes.DashboardsPlaces}/:id?`}
          render={() => (
            <ProtectedRoute>
              <Layout>
                <Dashboards />
              </Layout>
            </ProtectedRoute>
          )}
        />
        <Route
          exact
          path={`${AppRoutes.DashboardsProcesses}/:id?`}
          render={() => (
            <ProtectedRoute>
              <Layout>
                <Dashboards />
              </Layout>
            </ProtectedRoute>
          )}
        />

        <Route
          exact
          path={AppRoutes.Profile}
          render={() => (
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          )}
        />
        <Route
          exact
          path={AppRoutes.Subscriptions}
          render={() => (
            <ProtectedRoute>
              <Layout>
                <Subscriptions />
              </Layout>
            </ProtectedRoute>
          )}
        />

        <Route
          exact
          path={`${AppRoutes.Places}${CommonRoutes.LIST}`}
          render={() => (
            <ProtectedRoute>
              <Layout>
                <Places />
              </Layout>
            </ProtectedRoute>
          )}
        />
        <Route
          exact
          path={`${AppRoutes.Places}${CommonRoutes.CREATE}`}
          render={() => (
            <ProtectedRoute>
              <Layout>
                <Places />
              </Layout>
            </ProtectedRoute>
          )}
        />
        <Route
          exact
          path={`${AppRoutes.Places}${CommonRoutes.DETAILS}:id`}
          render={() => (
            <ProtectedRoute>
              <Layout>
                <Places />
              </Layout>
            </ProtectedRoute>
          )}
        />
        <Route
          exact
          path={`${AppRoutes.Places}${CommonRoutes.UPDATE}:id`}
          render={() => (
            <ProtectedRoute>
              <Layout>
                <Places />
              </Layout>
            </ProtectedRoute>
          )}
        />

        <Route
          exact
          path={`${AppRoutes.Members}${CommonRoutes.LIST}`}
          render={() => (
            <ProtectedRoute>
              <Layout>
                <Members />
              </Layout>
            </ProtectedRoute>
          )}
        />
        <Route
          exact
          path={`${AppRoutes.Members}${CommonRoutes.CREATE}`}
          render={() => (
            <ProtectedRoute>
              <Layout>
                <Members />
              </Layout>
            </ProtectedRoute>
          )}
        />
        <Route
          exact
          path={`${AppRoutes.Members}${CommonRoutes.DETAILS}:id`}
          render={() => (
            <ProtectedRoute>
              <Layout>
                <Members />
              </Layout>
            </ProtectedRoute>
          )}
        />
        <Route
          exact
          path={`${AppRoutes.Members}${CommonRoutes.UPDATE}:id`}
          render={() => (
            <ProtectedRoute>
              <Layout>
                <Members />
              </Layout>
            </ProtectedRoute>
          )}
        />

        <Route
          exact
          path={`${AppRoutes.Persons}/:type${CommonRoutes.LIST}`}
          render={() => (
            <ProtectedRoute>
              <Layout>
                <Persons />
              </Layout>
            </ProtectedRoute>
          )}
        />
        <Route
          exact
          path={`${AppRoutes.Persons}/:type${CommonRoutes.CREATE}`}
          render={() => (
            <ProtectedRoute>
              <Layout>
                <Persons />
              </Layout>
            </ProtectedRoute>
          )}
        />
        <Route
          exact
          path={`${AppRoutes.Persons}/:type${CommonRoutes.DETAILS}:id`}
          render={() => (
            <ProtectedRoute>
              <Layout>
                <Persons />
              </Layout>
            </ProtectedRoute>
          )}
        />
        <Route
          exact
          path={`${AppRoutes.Persons}/:type${CommonRoutes.UPDATE}:id`}
          render={() => (
            <ProtectedRoute>
              <Layout>
                <Persons />
              </Layout>
            </ProtectedRoute>
          )}
        />

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Suspense>
  );
}

export default App;
