import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Alert, AlertInterface, LoadingButton } from '../../../../components';
import { ForgotPasswordForm, ForgotPasswordRes } from '../../../../interfaces/auth';
import { WARNING_TYPES, validateEmail } from '../../../../libs';
import { AuthServices } from '../../../../services';
import { AuthLink, Title } from '../../components';
import { AuthRoutes } from '../../../../routes';

export function ForgotPassword() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<AlertInterface>({
    show: false,
    message: '',
    type: WARNING_TYPES.NONE,
    time: 3000,
  });

  const onSubmit = async (form: ForgotPasswordForm) => {
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
      const res = await AuthServices.forgotpassword({ email: form.email }) as ForgotPasswordRes;
      setLoading(false);
      history.push(AuthRoutes.ChangePassword, {
        email: res.email,
        date: res.date,
      });
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
    <main className="bg-white max-w-lg mx-auto p-4 md:p-6 my-10 rounded-lg shadow-2xl">
      <Title
        title="Esqueceu a Senha?"
        subtitle="Digite seu email e receba o link de recuperação"
      />
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
              {...register('email', { required: true })}
              className={
                `bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-2 py-2 ${
                  errors.email ? 'border-red-600 ' : 'focus:border-primary-600'}`
              }
            />
          </div>
          <AuthLink link={AuthRoutes.SignIn} text="Voltar para Entrar" />
          <LoadingButton
            styles="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            type="submit"
            text="Enviar Código"
            loading={loading}
          />
        </form>
      </section>
    </main>
  );
}

export default ForgotPassword;
