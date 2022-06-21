/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useEffect, ChangeEvent } from 'react';
import { useForm, Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextareaAutosize from 'react-textarea-autosize';
import {
  ICompanies, IPersons, IPersonsTypes, IPlaces,
} from '@interfaces';
import { AvatarCropper, AvatarOrInitial, LoadingButton } from '@components';
import { Lang } from '@lang';
import { getAddressFromCEP, validateEmail } from '@libs';
import { UploadCloudIcon } from '@icons';

export interface FormProps {
  loading: boolean;
  type: IPersonsTypes;
  data?: IPersons;
  places?: IPlaces[];
  companies?: ICompanies[];
  create?(data: FormData): void;
  update?(data: FormData): void;
}

const schema = yup.object({
  name: yup.string().required(),
  avatar: yup.mixed(),
  email: yup.string(),
  phone: yup.string(),
  zip: yup.string(),
  address: yup.string(),
  number: yup.string(),
  complement: yup.string(),
  neighborhood: yup.string(),
  city: yup.string(),
  state: yup.string(),
  position: yup.string(),
  companyId: yup.string(),
  comments: yup.string(),
});

export function Form({
  loading,
  type,
  data,
  companies,
  create,
  update,
}: FormProps) {
  const defaultValues = {
    name: data?.name || '',
    email: data?.email || '',
    phone: data?.phone || '',
    zip: data?.zip || '',
    address: data?.address || '',
    number: data?.number || '',
    complement: data?.complement || '',
    neighborhood: data?.neighborhood || '',
    city: data?.city || '',
    state: data?.state || '',
    position: data?.position || '',
    companyId: data?.companyId || '',
    comments: data?.comments || '',
    avatar: data?.avatar || '',
  };
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const avatarRegister = register('avatar');
  const [, setSelectedFile] = useState<File>();
  const [previewName, setPreviewName] = useState(defaultValues.name);
  const [preview, setPreview] = useState<string | undefined>('');

  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [, setBlob] = useState<Blob>();
  const [inputImg, setInputImg] = useState<string>();

  const [validZip, setValidZip] = useState(!!defaultValues.zip);

  async function fetchCEP(zip: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-shadow
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

  useEffect(() => {
    const name = watch((value) => {
      if (!preview && value.name) setPreviewName(value.name);
    });
    return () => name.unsubscribe();
  }, [preview, watch]);

  useEffect(() => {
    if (data?.avatar) {
      setPreview(`${process.env.NX_BUCKET_AVATAR_URL}${data?.avatar}`);
    }
  }, [data?.avatar]);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    const file = e.target.files[0];
    const allowedExtension = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedExtension.includes(file.type)) {
      setError('avatar', { message: 'Somente arquivo JPG ou PNG' });
      return;
    }
    if (file.size > 1000000) {
      setError('avatar', { message: 'Arquivo deve ter até 1 mega' });
      return;
    }
    clearErrors('avatar');
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        setInputImg(reader.result as string);
        setShowAvatarModal(true);
      },
      false,
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const getBlob = (blob: Blob) => {
    const blobURL = URL.createObjectURL(blob);
    setPreview(blobURL);
    setBlob(blob);
  };

  async function onSubmit(dataFromForm: IPersons) {
    if (dataFromForm.zip && !validZip) {
      setError('zip', { type: 'manual' });
      return;
    }
    if (dataFromForm.email && !validateEmail(dataFromForm.email)) {
      setError('email', { type: 'manual' });
      return;
    }
    const formData = new FormData();
    Object.entries(dataFromForm).forEach(([key, value]) => {
      if (key !== 'avatar') {
        formData.append(key, value as string);
      } else if (dataFromForm?.avatar?.length) {
        formData.append('avatar', dataFromForm.avatar[0]);
      }
    });
    formData.append('type', type as string);
    if (create) {
      create(formData);
      return;
    }
    if (update) {
      if (!data?.id) {
        return;
      }
      formData.append('id', data.id as string);
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

          <div className="col-span-full sm:col-span-6">
            <label htmlFor="companyId" className="text-sm">
              Empresa
            </label>
            <select
              {...register('companyId')}
              id="company"
              className="w-full rounded-md focus:ring-0 focus:ring-opacity-75 text-gray-900 border-gray-300"
            >
              <option value="" />
              {companies
                && companies.map((c, i) => (
                  <option key={i} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-span-full sm:col-span-6">
            <label htmlFor="position" className="text-sm">
              Cargo
            </label>
            <input
              {...register('position')}
              id="position"
              type="text"
              placeholder="Cargo"
              className="w-full rounded-md focus:ring-0 focus:ring-opacity-75 text-gray-900 border-gray-300"
            />
          </div>
          <div className="col-span-full sm:col-span-12">
            <label htmlFor="comments" className="text-sm">
              Observações
            </label>
            <TextareaAutosize
              {...register('comments')}
              minRows={3}
              id="comments"
              className="w-full rounded-md focus:ring-0 focus:ring-opacity-75 text-gray-900 border-gray-300"
            />
          </div>
          <div className="col-span-full flex flex-col items-center md:items-end">
            <label
              htmlFor="avatar"
              className="w-52 flex flex-col items-center px-1 py-2 bg-white rounded-md shadow-sm tracking-wide uppercase border border-blue cursor-pointer hover:bg-primary-300 hover:text-white text-primary-500 ease-linear transition-all duration-150"
            >
              <div className="flex items-center space-x-4">
                <AvatarOrInitial
                  avatar={preview}
                  name={previewName}
                  avatarStyle="h-12 w-12"
                  initialStyle="h-11 w-11"
                />
                <UploadCloudIcon styles="w-8 h-8" />
                <span className="mt-2 text-base leading-normal">Foto</span>
                <input
                  {...avatarRegister}
                  id="avatar"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    onSelectFile(e);
                    avatarRegister.onChange(e);
                  }}
                />
              </div>
            </label>
            {errors.avatar && (
              <p className="text-red-500">{errors.avatar.message}</p>
            )}
          </div>
          {showAvatarModal && (
            <AvatarCropper
              setShow={setShowAvatarModal}
              getBlob={getBlob}
              inputImg={inputImg as string}
            />
          )}

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
