import axios from 'axios';
import { Lang } from '@lang';

export function errorHandler(err: unknown): Error {
  if (axios.isAxiosError(err)) {
    let msg = !err.response ? err : err.response?.data.message;
    if (msg === 'No principalId set on the Response') msg = Lang.Errors.ServerError;
    throw new Error(msg);
  }
  throw new Error(Lang.Errors.ServerError);
}
