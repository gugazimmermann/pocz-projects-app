import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { AlertInterface, Alert, Header } from '@components';
import { ISubscriptions, IPayments, ICreditCards } from '@interfaces';
import { Lang } from '@lang';
import { WARNING_TYPES } from '@libs';
import { SubscriptionsServices } from '@services';
import { ListPayments, ListCreditCards } from './components';

/* eslint-disable no-param-reassign */
export function Subscriptions() {
  const [showAlert, setShowAlert] = useState<AlertInterface>({
    show: false,
    message: '',
    type: WARNING_TYPES.NONE,
    time: 3000,
  });
  const [subscription, setSubscription] = useState({} as ISubscriptions);
  const [payments, setPayments] = useState([] as IPayments[]);
  const [creditCards, setCreditCards] = useState([] as ICreditCards[]);
  const [list, setList] = useState(true);
  const [back, setBack] = useState(false);

  async function showList() {
    setList(true);
    setBack(false);
  }

  const createButton = (state: boolean) => (
    <button
      type="button"
      onClick={() => {
        if (back) {
          setBack(false);
          showList();
        } else {
          setList(false);
          setBack(true);
        }
      }}
      className={`px-4 py-2 text-sm text-white rounded-md ${
        !state
          ? 'bg-primary-500 hover:bg-primary-900 focus:ring-primary-500'
          : 'bg-secondary-500 hover:bg-secondary-700 '
      }`}
    >
      {back ? Lang.Subscriptions.Back : Lang.Subscriptions.Submit}
    </button>
  );

  async function populateData() {
    try {
      const dataSubscription = (await SubscriptionsServices.getSubscription()) as ISubscriptions;
      delete dataSubscription.id;
      delete dataSubscription.userId;
      delete dataSubscription.updatedAt;
      delete dataSubscription.createdAt;
      delete dataSubscription.deletedAt;
      setSubscription(dataSubscription);

      const resPayment = (await SubscriptionsServices.getPayments()) as IPayments[];
      const dataPayment = resPayment.map((p) => {
        delete p.id;
        delete p.userId;
        delete p.updatedAt;
        delete p.createdAt;
        delete p.deletedAt;
        return p;
      });
      const currentMonth = dataPayment.find((p) => {
        const date = DateTime.fromISO(p.paidDate).toFormat('MM');
        const thisMonth = DateTime.now().toFormat('MM');
        if (date === thisMonth) return true;
        return false;
      });
      if (!currentMonth) {
        dataPayment.unshift({
          transactionAmount: dataSubscription.transactionAmount,
          status: 'Pending',
          paidDate: DateTime.now().toISO(),
        });
      }
      setPayments(dataPayment);

      const resCreditCards = (await SubscriptionsServices.getCreditcards()) as ICreditCards[];
      const dataCreditCards = resCreditCards.map((c) => {
        delete c.id;
        delete c.userId;
        delete c.updatedAt;
        delete c.createdAt;
        delete c.deletedAt;
        return c;
      });
      setCreditCards(dataCreditCards);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
    }
  }

  useEffect(() => {
    populateData();
    setList(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto">
      <Header
        before={[]}
        main={`${Lang.Subscriptions.Title} - ${subscription.reason}`}
        button={createButton}
        back={back}
      />
      {showAlert.show && <Alert alert={showAlert} setAlert={setShowAlert} />}
      <div className="overflow-x-auto">
        <div className="flex items-center justify-center overflow-hidden p-2">
          <div className="w-full">
            {list && (
              <>
                <ListPayments payments={payments} />
                <ListCreditCards creditCards={creditCards} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscriptions;
