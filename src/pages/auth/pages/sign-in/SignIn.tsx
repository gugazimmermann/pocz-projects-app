import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AlertInterface, Alert, LoadingButton } from '../../../../components';
import { SignInForm } from '../../../../interfaces/auth';
import { WARNING_TYPES, validateEmail } from '../../../../libs';
import { AppRoutes, AuthRoutes } from '../../../../routes';
import { AuthServices } from '../../../../services';
import { Title, AuthLink, SignupLink } from '../../components';

interface State {
  email: string;
  changePassword: boolean;
  inviteaccepted: boolean;
}

export function SignIn() {
  const history = useHistory();
  const location = useLocation();
  const state = location.state as State;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SignInForm>();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<AlertInterface>({
    show: false,
    message: '',
    type: WARNING_TYPES.NONE,
    time: 3000,
  });

  useEffect(() => {
    if (state?.email) {
      setValue('email', state.email);
      setShowAlert({
        show: true,
        message: 'Cadastro realizado com sucesso!',
        type: WARNING_TYPES.SUCCESS,
      });
    }
    if (state?.changePassword) {
      setShowAlert({
        show: true,
        message: 'Senha alterada com sucesso!',
        type: WARNING_TYPES.SUCCESS,
      });
    }
    if (state?.inviteaccepted) {
      setShowAlert({
        show: true,
        message: 'Convite Aceito!',
        type: WARNING_TYPES.SUCCESS,
      });
    }
  }, [state, setValue]);

  const onSubmit = async (form: SignInForm) => {
    setLoading(true);
    if (!validateEmail(form.email)) {
      setShowAlert({
        show: true,
        message: 'Email inválido!',
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
      setLoading(false);
      return;
    }
    try {
      await AuthServices.signin(form);
      setLoading(false);
      history.push(AppRoutes.Dashboards);
    } catch (err: any) {
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <main className="bg-white max-w-lg mx-auto p-4 md:p-6 my-10 rounded-lg shadow-2xl">
        <Title title="Entre em seu escritório" />
        {showAlert.show && <Alert alert={showAlert} setAlert={setShowAlert} />}
        <section className="mt-5">
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2 rounded">
              <label
                className="block text-gray-700 text-sm font-bold mb-1 ml-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                autoComplete="on"
                {...register('email', { required: true })}
                className={
                  `bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-2 py-2 ${
                    errors.email
                      ? 'border-red-600 '
                      : 'focus:border-primary-600'}`
                }
              />
            </div>
            <div className="mb-2 rounded">
              <label
                className="block text-gray-700 text-sm font-bold mb-1 ml-2"
                htmlFor="password"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                autoComplete="current-password"
                {...register('password', { required: true })}
                className={
                  `bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-2 py-2 ${
                    errors.password
                      ? 'border-red-600 '
                      : 'focus:border-primary-600'}`
                }
              />
            </div>
            <AuthLink link={AuthRoutes.ForgotPassword} text="Esqueceu sua senha?" />
            <LoadingButton
              styles="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              type="submit"
              text="Entrar"
              loading={loading}
            />
          </form>
        </section>
      </main>
      <SignupLink />
    </>
  );
}

export default SignIn;
