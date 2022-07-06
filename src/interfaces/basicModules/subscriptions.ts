export interface ISubscriptions {
  id?: string;
  userId?: string;
  planId: string;
  reason: string;
  frequency: number;
  frequencyType: string;
  currency: string;
  transactionAmount: number;
  status: boolean;
  type?: string;
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string;
}

export interface IPlans {
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

export interface IPayments {
  id?: string;
  userId?: string;
  currency: string;
  transactionAmount: number;
  status: string;
  paidDate: string;
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string;
}

export interface ICreditCards {
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
