import { Link } from 'react-router-dom';
import { Lang } from '@lang';
import { AppRoutes } from '@routes';

export interface BasicPlanMsgProps {
  message: string;
  isAdmin: boolean;
}

export function BasicPlanMsg({ message, isAdmin }: BasicPlanMsgProps) {
  return (
    <div className="text-right p-2 text-xs text-gray-400">
      <span>{`${message}`}</span>
      {isAdmin && (
        <>
          {' - '}
          <Link to={AppRoutes.Subscriptions} className="underline">{Lang.Subscriptions.Submit}</Link>
        </>
      )}
    </div>
  );
}

export default BasicPlanMsg;
