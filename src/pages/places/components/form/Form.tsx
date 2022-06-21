/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import NumberFormat from 'react-number-format';
import { LoadingButton } from '@components';
import { IPlaces } from '@interfaces';
import { Lang } from '@lang';
import { getAddressFromCEP, validateEmail } from '@libs';

export interface FormProps {
  loading: boolean;
  data?: IPlaces;
  create?(data: IPlaces): void;
  update?(data: IPlaces): void;
}

const schema = yup.object({
  id: yup.string(),
  name: yup.string().required(),
  email: yup.string(),
  phone: yup.string(),
  zip: yup.string(),
  address: yup.string(),
  number: yup.string(),
  complement: yup.string(),
  neighborhood: yup.string(),
  city: yup.string(),
  state: yup.string(),
  active: yup.boolean(),
});

export function Form({
  loading, data, create, update,
}: FormProps) {
  const defaultValues = {
    id: '',
    name: data?.name || '',
    email: data?.email,
    phone: data?.phone,
    zip: data?.zip,
    address: data?.address,
    number: data?.number,
    complement: data?.complement,
    neighborhood: data?.neighborhood,
    city: data?.city,
    state: data?.state,
    active: data?.active,
  };
  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const [validZip, setValidZip] = useState(!!defaultValues.zip);

  async function fetchCEP(zip: string) {
    try {
      const data = await getAddressFromCEP(zip);
      if (data) {
        setValidZip(true);
        clearErrors('zip');
        setValue('state', data.state);
        clearErrors('state');
        setValue('address', data.address);
        clearErrors('address');
        setValue('neighborhood', data.neighborhood);
        clearErrors('neighborhood');
        setValue('city', data.city);
        clearErrors('city');
      }
    } catch (err) {
      setValidZip(false);
      setError('zip', { type: 'manual' });
      setValue('address', '');
      setValue('neighborhood', '');
      setValue('city', '');
      setValue('state', '');
    }
  }

  async function onSubmit(formData: IPlaces) {
    if (!formData.zip || !validZip) {
      setError('zip', { type: 'manual' });
      return;
    }
    if (formData.email && !validateEmail(formData.email)) {
      setError('email', { type: 'manual' });
      return;
    }
    if (create) {
      create(formData);
      return;
    }
    if (update) {
      if (!data?.id) return;
      formData.id = data.id;
      update(formData);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mx-auto">
      <fieldset className="grid grid-cols-1 gap-4 p-4 bg-white shadow-sm">
        <div className="grid grid-cols-12 gap-4 col-span-full lg:col-span-4">
          <div className="col-span-full sm:col-span-4">
            <label htmlFor="name" className="text-sm">
              {Lang.Places.Form.Name}
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
          <div className="col-span-full sm:col-span-4">
            <label htmlFor="email" className="text-sm">
              {Lang.Places.Form.Email}
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
          <div className="col-span-full sm:col-span-4">
            <label htmlFor="phone" className="text-sm">
              {Lang.Places.Form.Phone}
            </label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <NumberFormat
                  {...field}
                  format="(##) #####-####"
                  id="phone"
                  type="text"
                  placeholder="Telefone"
                  onValueChange={(c) => {
                    field.onChange(c.value);
                  }}
                  className={`w-full rounded-md focus:ring-0 text-gray-900 ${
                    errors.phone
                      ? 'focus:ring-red-500/75 border-red-500'
                      : 'focus:ring-primary-500/75 border-gray-300'
                  }`}
                />
              )}
            />
          </div>
          <div className="col-span-full sm:col-span-3">
            <label htmlFor="zip" className="text-sm">
              {Lang.Places.Form.ZipCode}
            </label>
            <Controller
              name="zip"
              control={control}
              render={({ field }) => (
                <NumberFormat
                  {...field}
                  format="##.###-###"
                  id="zip"
                  type="text"
                  placeholder="CEP"
                  onValueChange={(c) => {
                    field.onChange(c.value);
                    fetchCEP(c.value);
                  }}
                  className={`w-full rounded-md focus:ring-0 text-gray-900 ${
                    errors.zip
                      ? 'focus:ring-red-500/75 border-red-500'
                      : 'focus:ring-primary-500/75 border-gray-300'
                  }`}
                />
              )}
            />
          </div>
          <div className="col-span-full sm:col-span-9">
            <label htmlFor="address" className="text-sm">
              {Lang.Places.Form.Address}
            </label>
            <input
              {...register('address')}
              id="address"
              type="text"
              placeholder="Endereço"
              className={`w-full rounded-md focus:ring-0 text-gray-900 ${
                errors.address
                  ? 'focus:ring-red-500/75 border-red-500'
                  : 'focus:ring-primary-500/75 border-gray-300'
              }`}
            />
          </div>
          <div className="col-span-full sm:col-span-1">
            <label htmlFor="number" className="text-sm">
              {Lang.Places.Form.Number}
            </label>
            <input
              {...register('number')}
              id="number"
              type="text"
              placeholder="Nº"
              className={`w-full rounded-md focus:ring-0 text-gray-900 ${
                errors.number
                  ? 'focus:ring-red-500/75 border-red-500'
                  : 'focus:ring-primary-500/75 border-gray-300'
              }`}
            />
          </div>
          <div className="col-span-full sm:col-span-2">
            <label htmlFor="complement" className="text-sm">
              {Lang.Places.Form.Complement}
            </label>
            <input
              {...register('complement')}
              id="complement"
              type="text"
              placeholder="Complemento"
              className={`w-full rounded-md focus:ring-0 text-gray-900 ${
                errors.complement
                  ? 'focus:ring-red-500/75 border-red-500'
                  : 'focus:ring-primary-500/75 border-gray-300'
              }`}
            />
          </div>
          <div className="col-span-full sm:col-span-3">
            <label htmlFor="neighborhood" className="text-sm">
              {Lang.Places.Form.Neighborhood}
            </label>
            <input
              {...register('neighborhood')}
              id="neighborhood"
              type="text"
              placeholder="Bairro"
              className={`w-full rounded-md focus:ring-0 text-gray-900 ${
                errors.neighborhood
                  ? 'focus:ring-red-500/75 border-red-500'
                  : 'focus:ring-primary-500/75 border-gray-300'
              }`}
            />
          </div>
          <div className="col-span-full sm:col-span-4">
            <label htmlFor="city" className="text-sm">
              {Lang.Places.Form.City}
            </label>
            <input
              {...register('city')}
              id="city"
              type="text"
              placeholder="Cidade"
              className={`w-full rounded-md focus:ring-0 text-gray-900 ${
                errors.city
                  ? 'focus:ring-red-500/75 border-red-500'
                  : 'focus:ring-primary-500/75 border-gray-300'
              }`}
            />
          </div>
          <div className="col-span-full sm:col-span-2">
            <label htmlFor="state" className="text-sm">
              {Lang.Places.Form.State}
            </label>
            <select
              {...register('state')}
              id="state"
              className={`w-full rounded-md focus:ring-0 text-gray-900 ${
                errors.state
                  ? 'focus:ring-red-500/75 border-red-500'
                  : 'focus:ring-primary-500/75 border-gray-300'
              }`}
            >
              <option value="">UF</option>
              <option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="AP">AP</option>
              <option value="AM">AM</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="MT">MT</option>
              <option value="MS">MS</option>
              <option value="MG">MG</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PR">PR</option>
              <option value="PE">PE</option>
              <option value="PI">PI</option>
              <option value="RJ">RJ</option>
              <option value="RN">RN</option>
              <option value="RS">RS</option>
              <option value="RO">RO</option>
              <option value="RR">RR</option>
              <option value="SC">SC</option>
              <option value="SP">SP</option>
              <option value="SE">SE</option>
              <option value="TO">TO</option>
            </select>
          </div>
          <div className="col-span-full flex justify-center">
            <LoadingButton
              styles="w-full md:w-64 px-2 py-2 text-sm text-white rounded-md bg-primary-500 hover:bg-primary-900 focus:outline-none focus:ring focus:ring-primary-500 focus:ring-offset-1 focus:ring-offset-white"
              type="submit"
              text={create ? Lang.Places.Form.Add : Lang.Places.Form.Update}
              loading={loading}
            />
          </div>
        </div>
      </fieldset>
    </form>
  );
}

export default Form;
