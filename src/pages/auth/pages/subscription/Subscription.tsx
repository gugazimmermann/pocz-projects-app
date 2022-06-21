import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AlertInterface, Alert, LoadingButton } from '@components';
import { SignUpForm, IPlans, SubscriptionForm } from '@interfaces';
import { Lang } from '@lang';
import { WARNING_TYPES, showPlanPeriod } from '@libs';
import { AuthRoutes } from '@routes';
import { AuthServices } from '@services';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import { Title } from '../../components';
import {
  MercadoPago,
  Identification,
  CreateCardToken,
  CardToken,
} from './protocols';

const PUBLIC_KEY = process.env.NODE_ENV !== 'production'
  ? process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY_TEST
  : process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY;

interface Constructable<T> {
  new (key: string, options?: { locale: string }): T;
}

declare global {
  interface Window {
    MercadoPago: Constructable<MercadoPago>;
  }
}

export function Subscription() {
  const history = useHistory();
  const location = useLocation();
  const state = location?.state as {
    form: SignUpForm;
    plan: IPlans;
  };
  const form = state?.form || undefined;
  const plan = state?.plan || undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscriptionForm>();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<AlertInterface>({
    show: false,
    message: '',
    type: WARNING_TYPES.NONE,
    time: 3000,
  });
  const [mercadoPago, setMercadoPago] = useState<MercadoPago>();
  const [identificationTypes, setIdentificationTypes] = useState<Identification[]>();
  const [cardImg, setCardImg] = useState('');

  useEffect(() => {
    async function getIdentificationTypes(mp: MercadoPago) {
      const res = await mp.getIdentificationTypes();
      setIdentificationTypes(res);
    }
    const mp = new window.MercadoPago(PUBLIC_KEY as string, {
      locale: 'pt-BR',
    });
    setMercadoPago(mp);
    getIdentificationTypes(mp);
  }, []);

  async function getCardThumbnail(card: string) {
    if (card && mercadoPago) {
      const bin = card.replace(/\D/g, '').substring(0, 6);
      if (bin && bin.length === 6) {
        const paymentMethods = await mercadoPago.getPaymentMethods({ bin });
        if (paymentMethods.results.length > 0) {
          setCardImg(paymentMethods.results[0].thumbnail);
        } else {
          setCardImg('');
        }
      }
    }
  }

  async function getCardToken(data: CreateCardToken) {
    if (mercadoPago) {
      try {
        return await mercadoPago.createCardToken({
          cardNumber: data.cardNumber,
          cardholderName: data.cardholderName,
          cardExpirationMonth: data.cardExpirationMonth,
          cardExpirationYear: data.cardExpirationYear,
          securityCode: data.securityCode,
          identificationType: data.identificationType,
          identificationNumber: data.identificationNumber,
        });
      } catch (err: any) {
        setShowAlert({
          show: true,
          message: err.message as string,
          type: WARNING_TYPES.ERROR,
          time: 3000,
        });
      }
    }
    return null;
  }

  const onSubmit = async (data: SubscriptionForm) => {
    setLoading(true);
    try {
      const token: CardToken = await getCardToken({
        cardNumber: data.cardNumber.replace(/\D/g, ''),
        cardholderName: data.name,
        cardExpirationMonth: data.cardExpiration.split('/')[0],
        cardExpirationYear: `20${data.cardExpiration.split('/')[1]}`,
        securityCode: data.securityCode,
        identificationType: data.documentType,
        identificationNumber: data.document,
      });
      await AuthServices.signup({
        name: form.name,
        email: form.email,
        password: form.password,
        planId: plan.id as string,
        cardInfo: {
          id: token.id,
          name: token.cardholder.name,
          expirationMonth: token.expiration_month,
          expirationYear: token.expiration_year,
          firstSixDigits: token.first_six_digits,
          lastFourDigits: token.last_four_digits,
        },
      });
      setLoading(false);
      history.push(AuthRoutes.SignIn, { email: form.email });
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

  if (form === undefined || plan === undefined) {
    return <Redirect to={AuthRoutes.SignUp} />;
  }
  return (
    <main className="bg-white max-w-lg mx-auto p-4 md:p-6 my-10 rounded-lg shadow-2xl">
      <Title title={Lang.Auth.Subscription.Title} />
      {showAlert.show && <Alert alert={showAlert} setAlert={setShowAlert} />}
      <section>
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <p className="text-base font-bold uppercase text-center">
            {plan?.reason}
          </p>
          <p className="text-xl font-bold text-primary-700">
            {(plan?.transactionAmount as number).toLocaleString(
              Lang.CountryCode,
              {
                style: 'currency',
                currency: plan?.currencyId,
              },
            )}
            {' '}
            /
            {' '}
            <span className="text-xl">
              {showPlanPeriod(plan?.reason as string)}
            </span>
          </p>
        </div>
        <form
          id="form-checkout"
          className="flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-2 rounded">
            <label
              className="block text-gray-700 text-sm font-bold"
              htmlFor="name"
            >
              {Lang.Auth.Subscription.CardOwner}
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: true })}
              className={`bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-1 pb-1 ${
                errors.name ? 'border-red-600 ' : 'focus:border-primary-600'
              }`}
            />
          </div>
          <div className="flex items-center justify-center space-x-4 mb-2 rounded">
            <div className="flex-1">
              <label
                className="block text-gray-700 text-sm font-bold"
                htmlFor="cardNumber"
              >
                {Lang.Auth.Subscription.CardNumber}
              </label>
              <input
                type="text"
                id="number"
                {...register('cardNumber', { required: true })}
                onBlur={(e) => getCardThumbnail(e.target.value)}
                className={`bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-1 pb-1 ${
                  errors.cardNumber
                    ? 'border-red-600 '
                    : 'focus:border-primary-600'
                }`}
              />
            </div>
            <div className="flex-0">
              {cardImg !== '' && <img src={cardImg} alt="card banner" />}
            </div>
          </div>
          <div className="mb-2 rounded">
            <div className="flex space-x-6">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold"
                  htmlFor="cardExpiration"
                >
                  {Lang.Auth.Subscription.CardValid}
                </label>
                <input
                  type="text"
                  id="cardExpiration"
                  {...register('cardExpiration', { required: true })}
                  className={`bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-1 pb-1 ${
                    errors.cardExpiration
                      ? 'border-red-600 '
                      : 'focus:border-primary-600'
                  }`}
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold"
                  htmlFor="securityCode"
                >
                  <span className="inline-flex md:hidden">
                    {Lang.Auth.Subscription.CardSecurityCodeAbbr}
                  </span>
                  <span className="hidden md:inline-flex">
                    {Lang.Auth.Subscription.CardSecurityCode}
                  </span>
                </label>
                <input
                  type="text"
                  id="securityCode"
                  {...register('securityCode', { required: true })}
                  className={`bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-1 pb-1 ${
                    errors.securityCode
                      ? 'border-red-600 '
                      : 'focus:border-primary-600'
                  }`}
                />
              </div>
            </div>
          </div>
          <div className="mb-2 rounded">
            <div className="flex space-x-6">
              <div className="flex-0">
                <label
                  className="block text-gray-700 text-sm font-bold"
                  htmlFor="documentType"
                >
                  <span className="inline-flex md:hidden">
                    {Lang.Auth.Subscription.UserDocument}
                  </span>
                  <span className="hidden md:inline-flex">
                    {Lang.Auth.Subscription.UserDocumentType}
                  </span>
                </label>
                <select
                  id="documentType"
                  {...register('documentType', { required: true })}
                  className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-1 pb-1 focus:border-primary-600"
                >
                  {identificationTypes
                    && identificationTypes.length > 0
                    && identificationTypes.map((type, i) => (
                      <option key={i} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex-1">
                <label
                  className="block text-gray-700 text-sm font-bold"
                  htmlFor="document"
                >
                  {Lang.Auth.Subscription.UserDocumentNumber}
                </label>
                <input
                  type="text"
                  id="document"
                  {...register('document', { required: true })}
                  className={`bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-1 pb-1 ${
                    errors.document
                      ? 'border-red-600 '
                      : 'focus:border-primary-600'
                  }`}
                />
              </div>
            </div>
          </div>
          <LoadingButton
            styles="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            type="submit"
            text={Lang.Auth.Subscription.Foward}
            loading={loading}
          />
        </form>
      </section>
      {process.env.NODE_ENV !== 'production' && (
        <div className="mt-6 text-gray-400">
          Titular: APRO
          <br />
          Mastercard | 5031 4332 1540 6351 | 11/25 | 123
          <br />
          Visa | 4235 6477 2802 5682 | 11/25 | 123
        </div>
      )}
    </main>
  );
}

export default Subscription;
