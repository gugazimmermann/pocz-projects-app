import { useState, useEffect, ChangeEvent } from 'react';
import { useForm, Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  AlertInterface,
  Alert,
  AvatarOrInitial,
  AvatarCropper,
  LoadingButton,
  Header,
} from '@components';
import { UploadCloudIcon } from '@icons';
import { IProfiles } from '@interfaces';
import { Lang } from '@lang';
import { WARNING_TYPES, getAddressFromCEP, validateEmail } from '@libs';
import { ProfilesServices } from '@services';
import { PROFILE } from '@settings';

interface ProfileProps {
  profile?: IProfiles;
  setProfile?(profile: IProfiles): void;
}

export type IProfileForm = Omit<IProfiles, 'avatar'> & {
  avatar: string;
};

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  zip: yup.string().required().min(8).max(10),
  address: yup.string().required(),
  number: yup.string(),
  complement: yup.string(),
  neighborhood: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  avatar: yup.mixed(),
});

export function Profile({ profile, setProfile }: ProfileProps) {
  const defaultValues = {
    name: '',
    email: '',
    phone: '',
    zip: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    avatar: '',
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

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<AlertInterface>({
    show: false,
    message: '',
    type: WARNING_TYPES.NONE,
    time: 3000,
  });
  const avatarRegister = register('avatar');
  const [, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string | undefined>('');

  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [blob, setBlob] = useState<Blob>();
  const [inputImg, setInputImg] = useState<string>();

  const [validZip, setValidZip] = useState(false);

  useEffect(() => {
    if (profile?.id) {
      if (profile?.avatar) setPreview(profile?.avatar);
      Object.keys(profile as IProfiles).forEach((key: string) => {
        if (Object.prototype.hasOwnProperty.call(defaultValues, key)) {
          const formKey = key as keyof typeof defaultValues;
          setValue(formKey, profile[formKey]);
        }
      });
    }
  }, [profile]);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    const file = e.target.files[0];
    const allowedExtension = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedExtension.includes(file.type)) {
      setError('avatar', { message: Lang.Profile.AvatarExtension });
      return;
    }
    if (file.size > 1000000) {
      setError('avatar', { message: Lang.Profile.AvatarSize });
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

  const getBlob = (b: Blob) => {
    const blobURL = URL.createObjectURL(b);
    setPreview(blobURL);
    setBlob(b);
  };

  async function fetchCEP(zip: string) {
    if (zip !== profile?.zip.replace(/\D/g, '')) {
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
      } catch (err: any) {
        setShowAlert({
          show: true,
          message: err.message as string,
          type: WARNING_TYPES.ERROR,
          time: 3000,
        });
        setValidZip(false);
        setError('zip', { type: 'manual' });
        setValue('address', '');
        setValue('neighborhood', '');
        setValue('city', '');
        setValue('state', '');
      }
    } else {
      setValidZip(true);
      clearErrors('zip');
    }
  }

  async function onSubmit(data: IProfileForm) {
    setLoading(true);
    if (!validZip) {
      setError('zip', { type: 'manual' });
      setLoading(false);
      return;
    }
    if (data.email && !validateEmail(data.email)) {
      setError('email', { type: 'manual' });
      setLoading(false);
      return;
    }
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'avatar') {
        formData.append(key, value as string);
      } else if (data.avatar.length && blob) {
        formData.append('avatar', blob);
      }
    });
    try {
      await ProfilesServices.update({ formData });
      const profileData = await ProfilesServices.getOne();
      if (profileData && setProfile) {
        setProfile(profileData as IProfiles);
        setShowAlert({
          show: true,
          message: Lang.Profile.Updated,
          type: WARNING_TYPES.INFO,
          time: 3000,
        });
        setLoading(false);
      }
    } catch (err: any) {
      setLoading(false);
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
    }
  }

  return (
    <div className="container mx-auto">
      <Header before={[]} main={PROFILE.SINGLE} />
      <div className="overflow-x-auto">
        <div className="flex items-center justify-center overflow-hidden p-2">
          <div className="w-full">
            {showAlert.show && (
              <Alert alert={showAlert} setAlert={setShowAlert} />
            )}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col mx-auto"
              method="post"
              encType="multipart/form-data"
            >
              <fieldset className="grid grid-cols-1 gap-4 p-4 bg-white shadow-sm">
                <div className="grid grid-cols-12 gap-4 col-span-full lg:col-span-3">
                  <div className="col-span-full sm:col-span-4">
                    <label htmlFor="name" className="text-sm">
                      {Lang.Profile.Name}
                      {' '}
                      *
                    </label>
                    <input
                      {...register('name')}
                      id="name"
                      type="text"
                      placeholder={Lang.Profile.Name}
                      className={`w-full rounded-md focus:ring-0 text-gray-900 ${
                        errors.name
                          ? 'focus:ring-red-500/75 border-red-500'
                          : 'focus:ring-primary-500/75 border-gray-300'
                      }`}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-4">
                    <label htmlFor="name" className="text-sm">
                      {Lang.Profile.Email}
                      {' '}
                      *
                    </label>
                    <input
                      {...register('email')}
                      id="email"
                      type="email"
                      placeholder={Lang.Profile.Email}
                      className={`w-full rounded-md focus:ring-0 text-gray-900 ${
                        errors.email
                          ? 'focus:ring-red-500/75 border-red-500'
                          : 'focus:ring-primary-500/75 border-gray-300'
                      }`}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-4">
                    <label htmlFor="name" className="text-sm">
                      {Lang.Profile.Phone}
                      {' '}
                      *
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
                          placeholder={Lang.Profile.Phone}
                          onValueChange={(c) => field.onChange(c.value)}
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
                    <label htmlFor="name" className="text-sm">
                      {Lang.Profile.ZipCode}
                      {' '}
                      *
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
                          placeholder={Lang.Profile.ZipCode}
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
                    <label htmlFor="name" className="text-sm">
                      {Lang.Profile.Address}
                      {' '}
                      *
                    </label>
                    <input
                      {...register('address')}
                      id="address"
                      type="text"
                      placeholder={Lang.Profile.Address}
                      className={`w-full rounded-md focus:ring-0 text-gray-900 ${
                        errors.address
                          ? 'focus:ring-red-500/75 border-red-500'
                          : 'focus:ring-primary-500/75 border-gray-300'
                      }`}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-1">
                    <label htmlFor="name" className="text-sm">
                      {Lang.Profile.Number}
                    </label>
                    <input
                      {...register('number')}
                      id="number"
                      type="text"
                      placeholder={Lang.Profile.Number}
                      className={`w-full rounded-md focus:ring-0 text-gray-900 ${
                        errors.number
                          ? 'focus:ring-red-500/75 border-red-500'
                          : 'focus:ring-primary-500/75 border-gray-300'
                      }`}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-2">
                    <label htmlFor="name" className="text-sm">
                      {Lang.Profile.Complement}
                    </label>
                    <input
                      {...register('complement')}
                      id="complement"
                      type="text"
                      placeholder={Lang.Profile.Complement}
                      className={`w-full rounded-md focus:ring-0 text-gray-900 ${
                        errors.complement
                          ? 'focus:ring-red-500/75 border-red-500'
                          : 'focus:ring-primary-500/75 border-gray-300'
                      }`}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label htmlFor="name" className="text-sm">
                      {Lang.Profile.Neighborhood}
                      {' '}
                      *
                    </label>
                    <input
                      {...register('neighborhood')}
                      id="neighborhood"
                      type="text"
                      placeholder={Lang.Profile.Neighborhood}
                      className={`w-full rounded-md focus:ring-0 text-gray-900 ${
                        errors.neighborhood
                          ? 'focus:ring-red-500/75 border-red-500'
                          : 'focus:ring-primary-500/75 border-gray-300'
                      }`}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-4">
                    <label htmlFor="name" className="text-sm">
                      {Lang.Profile.City}
                      {' '}
                      *
                    </label>
                    <input
                      {...register('city')}
                      id="city"
                      type="text"
                      placeholder={Lang.Profile.City}
                      className={`w-full rounded-md focus:ring-0 text-gray-900 ${
                        errors.city
                          ? 'focus:ring-red-500/75 border-red-500'
                          : 'focus:ring-primary-500/75 border-gray-300'
                      }`}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-2">
                    <label htmlFor="name" className="text-sm">
                      {Lang.Profile.State}
                      {' '}
                      *
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

                  <div className="col-span-full flex flex-col items-center md:items-end">
                    <label
                      htmlFor="avatar"
                      className="w-52 flex flex-col items-center px-1 py-2 bg-white rounded-md shadow-sm tracking-wide uppercase border border-blue cursor-pointer hover:bg-primary-300 hover:text-white text-primary-500 ease-linear transition-all duration-150"
                    >
                      <div className="flex items-center space-x-4">
                        <AvatarOrInitial
                          avatar={preview}
                          name={profile?.name}
                          avatarStyle="w-12 h-12"
                          initialStyle="w-11 h-11"
                        />
                        <UploadCloudIcon styles="w-8 h-8" />
                        <span className="mt-2 text-base leading-normal">
                          {Lang.Profile.Avatar}
                        </span>
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
                      text={Lang.Profile.Submit}
                      loading={loading}
                    />
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
