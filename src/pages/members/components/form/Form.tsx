import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@components';
import { Lang } from '@lang';
import { validateEmail } from '@libs';

export interface FormProps {
  loading: boolean;
  create?(data: { name: string; email: string }): void;
}

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string(),
});

export function Form({ loading, create }: FormProps) {
  const defaultValues = {
    name: '',
    email: '',
  };
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  async function onSubmit(formData: { name: string; email: string }) {
    if (!formData.name) {
      setError('name', { type: 'manual' });
      return;
    }
    if (formData.email && !validateEmail(formData.email)) {
      setError('email', { type: 'manual' });
      return;
    }
    if (create) {
      create(formData);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mx-auto">
      <fieldset className="grid grid-cols-1 gap-4 p-4 bg-white shadow-sm">
        <div className="grid grid-cols-12 gap-4 col-span-full lg:col-span-4">
          <div className="col-span-full sm:col-span-12">
            <label htmlFor="name" className="text-sm">
              {Lang.Members.Form.Name}
              {' '}
              *
            </label>
            <input
              {...register('name')}
              id="name"
              type="text"
              placeholder="Nome"
              className={`w-full rounded-md focus:ring-0 text-gray-900 ${
                errors.name
                  ? 'focus:ring-red-500/75 border-red-500'
                  : 'focus:ring-primary-500/75 border-gray-300'
              }`}
            />
          </div>
          <div className="col-span-full sm:col-span-12">
            <label htmlFor="email" className="text-sm">
              {Lang.Members.Form.Email}
            </label>
            <input
              {...register('email')}
              id="email"
              type="email"
              placeholder="Email"
              className={`w-full rounded-md focus:ring-0 text-gray-900 ${
                errors.email
                  ? 'focus:ring-red-500/75 border-red-500'
                  : 'focus:ring-primary-500/75 border-gray-300'
              }`}
            />
          </div>
          <div className="col-span-full flex justify-center">
            <LoadingButton
              styles="w-full md:w-64 px-2 py-2 text-sm text-white rounded-md bg-primary-500 hover:bg-primary-900 focus:outline-none focus:ring focus:ring-primary-500 focus:ring-offset-1 focus:ring-offset-white"
              type="submit"
              text={Lang.Members.Form.Add}
              loading={loading}
            />
          </div>
        </div>
      </fieldset>
    </form>
  );
}

export default Form;
