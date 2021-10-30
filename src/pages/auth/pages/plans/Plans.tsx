import { useEffect, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { PlanProfessionalIcon, PlanBasicIcon } from '../../../../icons';
import { SignUpForm } from '../../../../interfaces/auth';
import { IPlan } from '../../../../interfaces/subscriptions';
import { showPlanPeriod } from '../../../../libs';
import { AuthRoutes } from '../../../../routes';
import { SubscriptionsServices, AuthServices } from '../../../../services';
import { Title } from '../../components';
import { BasicFeatures, ProfessionalFeatures } from './features';

interface State {
  form: SignUpForm;
}

export function Plans() {
  const location = useLocation();
  const history = useHistory();
  const state = location?.state as State;
  const form = state?.form;
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [plan, setPlan] = useState<IPlan>();
  const [selectedPlan, setSelectedPlan] = useState('');

  async function getPlans() {
    const data = (await SubscriptionsServices.getPlans()) as IPlan[];
    const freePlan = data.find((p) => p.transactionAmount === 0);
    setSelectedPlan(freePlan?.id as string);
    setPlan(freePlan);
    setPlans(data);
  }

  useEffect(() => {
    getPlans();
  }, []);

  function handleSelectPlan(id: string) {
    setSelectedPlan(id);
    const userPlan = plans.find((p) => p.id === id);
    if (userPlan) setPlan(userPlan);
  }

  function planIcon(p: IPlan | undefined) {
    if (
      (p?.reason as string).toLowerCase().includes('profissional')
      || (p?.reason as string).toLowerCase().includes('gratuito')
    ) {
      return <PlanProfessionalIcon styles="w-12 h-12 text-primary-700" />;
    }
    return <PlanBasicIcon styles="w-12 h-12 text-primary-700" />;
  }

  function planFeatures(p: IPlan | undefined) {
    if (
      (p?.reason as string).toLowerCase().includes('profissional')
      || (p?.reason as string).toLowerCase().includes('gratuito')
    ) {
      return <ProfessionalFeatures />;
    }
    return <BasicFeatures />;
  }

  function planMsg(p: IPlan | undefined) {
    if (
      !(p?.reason as string).toLowerCase().includes('profissional')
      && !(p?.reason as string).toLowerCase().includes('gratuito')
    ) {
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <p className="mt-4 text-sm text-gray-600">
            O plano pode ser alterado posteriormente para Profissional.
          </p>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <p className="mt-4 text-sm font-bold text-red-600">
          Período de testes de 15 dias!
        </p>
        <p className="mt-2 text-sm text-gray-600">
          O plano pode ser alterado posteriormente para Básico ou Profissional.
        </p>
      </div>
    );
  }

  async function handleFoward() {
    if (plan?.transactionAmount !== 0) {
      history.push(AuthRoutes.Subscription, { form, plan });
    } else {
      await AuthServices.signup({
        name: form.name,
        email: form.email,
        password: form.password,
        planId: plan.id as string,
      });
      history.push(AuthRoutes.SignIn, { email: form.email });
    }
  }

  if (form === undefined) {
    return <Redirect to={AuthRoutes.SignUp} />;
  }
  return (
    <main className="bg-white max-w-lg mx-auto p-4 md:p-6 my-10 rounded-lg shadow-2xl">
      <Title title="Selecione seu Plano" />
      <section>
        <form className="flex flex-col">
          <div className="mb-2 rounded">
            <select
              id="plan"
              value={selectedPlan || ''}
              onChange={(e) => handleSelectPlan(e.target.value)}
              className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-2 py-2"
            >
              {plans
                && plans.length
                && plans.map((p, i) => (
                  <option key={i} value={p.id}>
                    {p.reason}
                    {' '}
                    -
                    {' '}
                    {(p.transactionAmount as number).toLocaleString('pt-br', {
                      style: 'currency',
                      currency: p.currencyId,
                    })}
                  </option>
                ))}
            </select>
          </div>
        </form>
        <div className="grid mx-auto">
          <div className="flex flex-col justify-between p-4 bg-white border rounded shadow-sm">
            {plan && (
              <>
                <div className="mb-6">
                  <div className="flex flex-col md:flex-row items-center justify-between pb-6 mb-6 border-b">
                    <div>
                      <p className="text-sm font-bold uppercase text-center">
                        {plan?.reason}
                      </p>
                      <p className="text-3xl font-bold text-primary-700">
                        {(plan?.transactionAmount as number).toLocaleString(
                          'pt-br',
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
                    <div className="mt-4 md:mt-0 flex items-center justify-center w-24 h-24 rounded-full bg-primary-100">
                      {planIcon(plan)}
                    </div>
                  </div>
                  <div>
                    <div className="w-full text-center">
                      <p className="mb-2 font-bold tracking-wide">
                        Características
                      </p>
                    </div>
                    {planFeatures(plan)}
                  </div>
                </div>
                <div>{planMsg(plan)}</div>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <button
            className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            type="button"
            onClick={() => handleFoward()}
          >
            Avançar
          </button>
        </div>
      </section>
    </main>
  );
}

export default Plans;
