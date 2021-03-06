import { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AlertInterface, Alert, LoadingButton } from '@components';
import { SignUpForm } from '@interfaces';
import { Lang } from '@lang';
import { WARNING_TYPES, validateEmail } from '@libs';
import { AuthRoutes } from '@routes';
import { Title } from '../../components';

// TODO: send a welcome email
export function SignUp() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<AlertInterface>({
    show: false,
    message: '',
    type: WARNING_TYPES.NONE,
    time: 3000,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>();

  const onSubmit = async (form: SignUpForm) => {
    setLoading(true);
    if (!validateEmail(form.email)) {
      setShowAlert({
        show: true,
        message: Lang.Auth.SignUp.InvalidEmail,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
      setLoading(false);
      return;
    }
    if (form.password !== form.repeatPassword) {
      setShowAlert({
        show: true,
        message: Lang.Auth.SignUp.DifferentPassword,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
      setLoading(false);
      return;
    }
    setLoading(false);
    history.push(AuthRoutes.Plans, { form });
  };

  return (
    <main className="bg-white max-w-lg mx-auto p-4 md:p-6 my-10 rounded-lg shadow-2xl">
      <Title title={Lang.Auth.SignUp.Title} />
      {showAlert.show && <Alert alert={showAlert} setAlert={setShowAlert} />}
      <section className="mt-5">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2 rounded">
            <label
              className="block text-gray-700 text-sm font-bold mb-1 ml-2"
              htmlFor="username"
            >
              {Lang.Auth.SignUp.Name}
            </label>
            <input
              type="text"
              id="username"
              autoComplete="username"
              {...register('name', { required: true })}
              className={
                `bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-2 py-2 ${
                  errors.name ? 'border-red-600 ' : 'focus:border-primary-600'}`
              }
            />
          </div>
          <div className="mb-2 rounded">
            <label
              className="block text-gray-700 text-sm font-bold mb-1 ml-2"
              htmlFor="email"
            >
              {Lang.Auth.SignUp.Email}
            </label>
            <input
              type="text"
              id="email"
              autoComplete="email"
              {...register('email', { required: true })}
              className={
                `bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-2 py-2 ${
                  errors.email ? 'border-red-600 ' : 'focus:border-primary-600'}`
              }
            />
          </div>
          <div className="mb-2 rounded">
            <label
              className="block text-gray-700 text-sm font-bold mb-1 ml-2"
              htmlFor="password"
            >
              {Lang.Auth.SignUp.Password}
            </label>
            <input
              type="password"
              id="password"
              autoComplete="new-password"
              {...register('password', { required: true })}
              className={
                `bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-2 py-2 ${
                  errors.password
                    ? 'border-red-600 '
                    : 'focus:border-primary-600'}`
              }
            />
          </div>
          <div className="mb-2 rounded">
            <label
              className="block text-gray-700 text-sm font-bold mb-1 ml-2"
              htmlFor="repeatPassword"
            >
              {Lang.Auth.SignUp.RepeatPassword}
            </label>
            <input
              type="password"
              id="repeatPassword"
              autoComplete="new-password"
              {...register('repeatPassword', { required: true })}
              className={
                `bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-2 py-2 ${
                  errors.repeatPassword
                    ? 'border-red-600 '
                    : 'focus:border-primary-600'}`
              }
            />
          </div>
          <div className="flex justify-end">
            <RouterLink to="/entrar">
              <div className="text-sm text-primary-600 hover:text-primary-700 hover:underline mb-6">
                {Lang.Auth.SignUp.Back}
              </div>
            </RouterLink>
          </div>
          <LoadingButton
            styles="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            type="submit"
            text={Lang.Auth.SignUp.Foward}
            loading={loading}
          />
        </form>
      </section>
      {process.env.NODE_ENV !== 'production' && (
        <div className="mt-6 text-gray-400">MercadoPago Email: test_user_82166921@testuser.com</div>
      )}
    </main>
  );
}

export default SignUp;
