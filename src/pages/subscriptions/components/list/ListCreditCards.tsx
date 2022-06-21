import { CloseIcon, CreditCardIcon, TrashIcon } from '@icons';
import { ICreditCards } from '@interfaces';
import { Lang } from '@lang';

/* eslint-disable jsx-a11y/control-has-associated-label */
export interface ListCreditCardsProps {
  creditCards: ICreditCards[];
}

export function ListCreditCards({ creditCards }: ListCreditCardsProps) {
  function translateStatus(status: boolean) {
    switch (status) {
      case true:
        return (
          <span className="bg-green-200 text-green-700 font-bold py-1 px-3 rounded-full text-xs">
            {Lang.Subscriptions.CreditCards.Active}
          </span>
        );
      default:
        return (
          <span className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded-full text-xs">
            {Lang.Subscriptions.CreditCards.Inactive}
          </span>
        );
    }
  }

  return (
    <>
      <div className="bg-primary-500 text-white uppercase font-bold text-sm p-2 mt-4">
        {Lang.Subscriptions.CreditCards.CreditCards}
      </div>
      <table className="min-w-max w-full table-auto bg-white shadow-sm">
        <thead>
          <tr className="bg-primary-200 text-gray-900 text-xs uppercase leading-normal">
            <th className="py-2 px-2 text-left  hidden sm:table-cell">
              {Lang.Subscriptions.CreditCards.Owner}
            </th>
            <th className="py-2 px-2 text-center">
              {Lang.Subscriptions.CreditCards.Number}
            </th>
            <th className="py-2 px-2 text-center  hidden sm:table-cell">
              {Lang.Subscriptions.CreditCards.Valid}
            </th>
            <th className="py-2 px-2 text-center">
              {Lang.Subscriptions.CreditCards.Status}
            </th>
            <th className="py-2 px-2 text-right" />
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {creditCards
            && creditCards.map((creditCard, i) => (
              <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-3 text-left whitespace-nowrap  hidden sm:table-cell">
                  <span>{creditCard.name}</span>
                </td>
                <td className="py-3 px-3 text-center whitespace-nowrap">
                  <span>
                    {`${creditCard.firstSixDigits.substring(0, 4)} ... ${
                      creditCard.lastFourDigits
                    }`}
                  </span>
                </td>
                <td className="py-3 px-3 text-center whitespace-nowrap  hidden sm:table-cell">
                  <span>
                    {creditCard.expirationMonth}
                    {' '}
                    /
                    {' '}
                    {creditCard.expirationYear}
                  </span>
                </td>
                <td className="py-3 px-3 text-center whitespace-nowrap">
                  {translateStatus(creditCard.status)}
                </td>
                <td className="py-3 px-3 text-right">
                  <div className="flex item-center justify-end">
                    <div className="w-5 mr-3 hover:text-purple-500 hover:scale-110">
                      {creditCard.status ? (
                        <CloseIcon styles="cursor-pointer" />
                      ) : (
                        <CreditCardIcon styles="w-6 cursor-pointer" />
                      )}
                    </div>
                    <div className="w-5 mr-3 hover:text-purple-500 hover:scale-110">
                      <TrashIcon styles="cursor-pointer" />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default ListCreditCards;
