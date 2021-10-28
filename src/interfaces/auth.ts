export interface SignUpReq {
  name: string;
  email: string;
  password: string;
  planId: string;
  cardInfo?: {
    id: string;
    name: string;
    expirationMonth: number;
    expirationYear: number;
    firstSixDigits: string;
    lastFourDigits: string;
  }
}

export interface SignInReq {
  email: string,
  password: string
}

export interface SignInRes {
  auth: boolean,
  status: string,
  accessToken: string;
  refreshToken: string;
  tenant: string;
}

export interface ForgotPasswordReq {
  email: string;
}

export interface ForgotPasswordRes {
  email: string;
  date: string;
}

export interface ForgotPasswordCodeReq {
  codeurl: string;
}

export interface ForgotPasswordCodeRes {
  code: string;
}

export interface ChangePasswordReq {
  codeNumber: string;
  password: string;
}

export interface UserRes {
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface SignInForm {
  email: string;
  password: string;
}

export interface SignUpForm {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface SubscriptionForm {
  name: string;
  cardNumber: string;
  cardExpiration: string;
  securityCode: string;
  documentType: string;
  document: string;
}

export interface ChangePasswordForm {
  code: string;
  newpassword: string;
  repeatnewpassword: string;
}

export interface ForgotPasswordForm {
  email: string;
}
