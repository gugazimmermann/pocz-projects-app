import axios from 'axios';
import { Lang } from '@lang';

export function errorHandler(err: unknown): Error {
  if (axios.isAxiosError(err)) {
    const msg = !err.response ? err : err.response?.data.message;
    throw new Error(msg);
  }
  throw new Error(Lang.Errors.ServerError);
}
