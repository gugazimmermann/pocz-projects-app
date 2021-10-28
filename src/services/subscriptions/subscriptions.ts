import api from '../../api';
import {
  ICreditCard,
  IPayment,
  IPlan,
  ISubscription,
} from '../../interfaces/subscriptions';
import { errorHandler } from '../../libs';

export async function getPlans(): Promise<IPlan[] | Error> {
  try {
    const { data } = await api.get('/auth/plans');
    return data;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function getSubscription(): Promise<ISubscription | Error> {
  try {
    const { data } = await api.get('/auth/subscription');
    return data;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function getPayments(): Promise<IPayment[] | Error> {
  try {
    const { data } = await api.get('/auth/payments');
    return data;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function getCreditcards(): Promise<ICreditCard[] | Error> {
  try {
    const { data } = await api.get('/auth/credit-cards');
    return data;
  } catch (err) {
    return errorHandler(err);
  }
}
