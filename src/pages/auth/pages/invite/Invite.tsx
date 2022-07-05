/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AlertInterface, Alert, LoadingButton } from '@components';
import { WARNING_TYPES } from '@libs';
import { MembersServices } from '@services';
import { IMembers } from '@interfaces';
import { AuthRoutes } from '@routes';
import { Title } from '../../components';

type Form = {
  code: string;
  newpassword: string;
  repeatnewpassword: string;
};

interface useParamsProps {
  tenantId: string;
  code: string;
}

export default function Invite() {
  const history = useHistory();
  const { tenantId, code } = useParams<useParamsProps>();
  const [codeUrl] = useState(code);
  const [tenantIdUrl] = useState(tenantId);
  const [invite, setInvite] = useState<IMembers>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Form>();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<AlertInterface>({
    show: false,
    message: '',
    type: WARNING_TYPES.NONE,
    time: 3000,
  });

  async function getCode(tenantIdUrl: string, codeUrl: string) {
    try {
      const data = (await MembersServices.getInviteCode({
        tenantId: tenantIdUrl,
        code: codeUrl,
      })) as IMembers;
      setInvite(data);
      setLoading(false);
    } catch (err: any) {
      setShowAlert({
        show: true,
        message: 'Não foi possível recuperar o código, verifique seu email.',
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
      setLoading(false);
    }
  }

  useEffect(() => {
    if (codeUrl && tenantIdUrl) {
      getCode(tenantIdUrl, codeUrl);
    }
  }, [codeUrl, tenantIdUrl]);

  useEffect(() => {
    if (invite?.code) {
      setValue('code', invite.code);
    }
  }, [invite]);

  const onSubmit = async (form: Form) => {
    setLoading(true);
    if (form.newpassword !== form.repeatnewpassword) {
      setShowAlert({
        show: true,
        message: 'Senhas são diferentes!',
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
      setLoading(false);
      return;
    }
    try {
      await MembersServices.create({
        tenantId: tenantIdUrl,
        code: form.code,
        password: form.newpassword,
      });
      setLoading(false);
      history.push(AuthRoutes.SignIn, {
        inviteaccepted: true,
        email: invite?.email,
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
      <Title title="Convite" />
      {showAlert.show && <Alert alert={showAlert} setAlert={setShowAlert} />}
      <section className="mt-5">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2 rounded">
            <label
              className="block text-gray-700 text-sm font-bold mb-1 ml-2"
              htmlFor="code"
            >
              Código
            </label>
            <input
              type="text"
              id="code"
              autoComplete="off"
              disabled={!!codeUrl}
              {...register('code', { required: true })}
              className={`bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-2 pb-1 ${
                errors.code ? 'border-red-600 ' : 'focus:border-primary-600'
              }`}
            />
          </div>
          <div className="mb-2 rounded">
            <label
              className="block text-gray-700 text-sm font-bold mb-1 ml-2"
              htmlFor="newpassword"
            >
              Cadastre sua Senha
            </label>
            <input
              type="password"
              id="newpassword"
              autoComplete="new-password"
              {...register('newpassword', { required: true })}
              className={`bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-2 pb-1 ${
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
              Repita a Senha
            </label>
            <input
              type="password"
              id="repeatnewpassword"
              autoComplete="new-password"
              {...register('repeatnewpassword', { required: true })}
              className={`bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-2 pb-1 ${
                errors.repeatnewpassword
                  ? 'border-red-600 '
                  : 'focus:border-primary-600'
              }`}
            />
          </div>
          <LoadingButton
            styles="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            type="submit"
            text="Aceitar Convite"
            loading={loading}
          />
        </form>
      </section>
    </main>
  );
}
