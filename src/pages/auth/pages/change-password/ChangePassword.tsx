import { useState, useEffect } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AlertInterface, Alert, LoadingButton } from '@components';
import { ChangePasswordForm } from '@interfaces';
import { Lang } from '@lang';
import { formatText, WARNING_TYPES } from '@libs';
import { AuthRoutes } from '@routes';
import { AuthServices } from '@services';
import { Title, AuthLink } from '../../components';

type StateType = {
  email: string;
  date: string;
};

export function ChangePassword() {
  const { urlcode } = useParams<{ urlcode: string }>();
  const [codeurl, setCodeurl] = useState(urlcode);
  const location = useLocation();
  const [state, setState] = useState(location.state as StateType);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ChangePasswordForm>();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<AlertInterface>({
    show: false,
    message: '',
    type: WARNING_TYPES.NONE,
    time: 3000,
  });

  useEffect(() => {
    async function getPasswordCode(code: string) {
      try {
        const res = (await AuthServices.getforgotpasswordcode({
          codeurl: code,
        })) as {
          code: string;
        };
        setLoading(false);
        setValue('code', res.code);
      } catch (err: any) {
        setCodeurl('');
        setShowAlert({
          show: true,
          message: Lang.Auth.ChangePassword.NoCodeError,
          type: WARNING_TYPES.ERROR,
          time: 3000,
        });
        setLoading(false);
      }
    }
    if (codeurl) {
      getPasswordCode(codeurl);
    }
  }, [history, setValue, codeurl]);

  function showInfo(infoSstate: StateType) {
    const day = infoSstate.date.split(' ')[0];
    const dateSplit = infoSstate.date.split(' ')[1];
    const hours = `${dateSplit.split(':')[0]}:${dateSplit.split(':')[1]}`;

    return (
      <div
        className="bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-4 py-3 mt-3 shadow-md"
        role="alert"
      >
        <div className="flex">
          <div className="py-1">
            <svg
              className="fill-current h-6 w-6 text-teal-500 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
          </div>
          <div>
            <p
              className="py-1"
              dangerouslySetInnerHTML={{
                __html: formatText(Lang.Auth.ChangePassword.SeeEmail, [
                  `<span className="font-bold">${state.email}</span>`,
                ]),
              }}
            />
            <p
              className="py-1"
              dangerouslySetInnerHTML={{
                __html: formatText(Lang.Auth.ChangePassword.SeeValidate, [
                  `<span className="font-bold">${hours} hs</span>`,
                  `<span className="font-bold">${day}</span>`,
                ]),
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  const onSubmit = async (form: ChangePasswordForm) => {
    setLoading(true);
    setState({ ...state, email: '' });
    if (form.newpassword !== form.repeatnewpassword) {
      setShowAlert({
        show: true,
        message: Lang.Auth.ChangePassword.DifferentPassword,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
      setLoading(false);
      return;
    }
    try {
      await AuthServices.changepassword({
        codeNumber: form.code,
        password: form.newpassword,
      });
      setLoading(false);
      history.push(AuthRoutes.SignIn, { changePassword: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      <Title title={Lang.Auth.ChangePassword.Title} />
      {state?.email && showInfo(state)}
      {showAlert.show && <Alert alert={showAlert} setAlert={setShowAlert} />}
      <section className="mt-5">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2 rounded">
            <label
              className="block text-gray-700 text-sm font-bold mb-1 ml-2"
              htmlFor="code"
            >
              {Lang.Auth.ChangePassword.Code}
            </label>
            <input
              type="text"
              id="code"
              disabled={!!codeurl}
              {...register('code', { required: true })}
              className={`bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-2 py-2 ${
                errors.code ? 'border-red-600 ' : 'focus:border-primary-600'
              }`}
            />
          </div>
          <div className="mb-2 rounded">
            <label
              className="block text-gray-700 text-sm font-bold mb-1 ml-2"
              htmlFor="newpassword"
            >
              {Lang.Auth.ChangePassword.NewPassword}
            </label>
            <input
              type="password"
              id="newpassword"
              {...register('newpassword', { required: true })}
              className={`bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-2 py-2 ${
                errors.newpassword
                  ? 'border-red-600 '
                  : 'focus:border-primary-600'
              }`}
            />
          </div>
          <div className="mb-2 rounded">
            <label
              className="block text-gray-700 text-sm font-bold mb-1 ml-2"
              htmlFor="repeatnewpassword"
            >
              {Lang.Auth.ChangePassword.RepeatNewPassword}
            </label>
            <input
              type="password"
              id="repeatnewpassword"
              {...register('repeatnewpassword', { required: true })}
              className={`bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-2 py-2 ${
                errors.repeatnewpassword
                  ? 'border-red-600 '
                  : 'focus:border-primary-600'
              }`}
            />
          </div>
          <AuthLink link={AuthRoutes.SignIn} text={Lang.Auth.ChangePassword.Back} />
          <LoadingButton
            styles="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            type="submit"
            text={Lang.Auth.ChangePassword.ChangePassword}
            loading={loading}
          />
        </form>
      </section>
    </main>
  );
}

export default ChangePassword;
