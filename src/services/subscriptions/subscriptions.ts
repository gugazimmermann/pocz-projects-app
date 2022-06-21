import { api } from '@api';
import {
  IPlans, ISubscriptions, IPayments, ICreditCards,
} from '@interfaces';
import { errorHandler } from '@libs';

export async function getPlans(): Promise<IPlans[] | Error> {
  try {
    const { data } = await api.get('/subscriptions/plans');
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function getSubscription(): Promise<ISubscriptions | Error> {
  try {
    const { data } = await api.get('/subscriptions');
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function getPayments(): Promise<IPayments[] | Error> {
  try {
    const { data } = await api.get('/subscriptions/payments');
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function getCreditcards(): Promise<ICreditCards[] | Error> {
  try {
    const { data } = await api.get('/subscriptions/credit-cards');
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}
