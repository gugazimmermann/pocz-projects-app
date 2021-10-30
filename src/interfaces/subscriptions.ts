export interface ISubscription {
  id?: string;
  userId?: string;
  planId: string;
  reason: string;
  frequency: number;
  frequencyType: string;
  transactionAmount: number;
  status: boolean;
  type?: string;
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string;
}

export interface IPlan {
  id?: string;
  preapprovalPlanId?: string;
  collectorId?: number;
  applicationId?: number;
  reason?: string;
  status?: string;
  initPoint?: string;
  frequency?: number;
  frequencyType?: string;
  transactionAmount: number;
  currencyId?: string;
  type?: string;
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string;
}

export interface IPayment {
  id?: string;
  userId?: string;
  transactionAmount: number;
  status: string;
  paidDate: string;
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string;
}

export interface ICreditCard {
  id?: string;
  userId?: string;
  name: string;
  firstSixDigits: string;
  lastFourDigits: string;
  expirationMonth: string;
  expirationYear: string;
  status: boolean;
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string;
}
