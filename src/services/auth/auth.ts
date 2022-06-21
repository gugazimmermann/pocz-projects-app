import { api, TokenService } from '@api';
import {
  SignUpReq,
  ApiMessageRes,
  SignInReq,
  SignInRes,
  ForgotPasswordReq,
  ForgotPasswordRes,
  ForgotPasswordCodeReq,
  ForgotPasswordCodeRes,
  ChangePasswordReq,
  UserRes,
} from '@interfaces';
import { errorHandler } from '@libs';

export async function signup({
  name,
  email,
  password,
  planId,
  cardInfo,
}: SignUpReq): Promise<ApiMessageRes | Error> {
  try {
    const { data } = await api.post('/auth/register', {
      name,
      email,
      password,
      planId,
      cardInfo,
    });
    return data;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function signin({
  email,
  password,
}: SignInReq): Promise<SignInRes | Error> {
  try {
    const { data } = await api.post('/auth/login', { email, password });
    TokenService.setUser(data);
    return data;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function forgotpassword({
  email,
}: ForgotPasswordReq): Promise<ForgotPasswordRes | Error> {
  try {
    const res = await api.post('/auth/forgot-password', { email });
    return {
      email: res.data.email,
      date: res.data.date,
    };
  } catch (err) {
    return errorHandler(err);
  }
}

export async function getforgotpasswordcode({
  codeurl,
}: ForgotPasswordCodeReq): Promise<ForgotPasswordCodeRes | Error> {
  try {
    const { data } = await api.post('/auth/forgot-password-code', { codeurl });
    return data;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function changepassword({
  codeNumber,
  password,
}: ChangePasswordReq): Promise<ApiMessageRes | Error> {
  const code = `${codeNumber}`.trim().replace(/ /g, '');
  try {
    const { data } = await api.post('/auth/change-password', {
      code,
      password,
    });
    return data;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function getMe(): Promise<UserRes | Error> {
  try {
    const { data } = await api.get('/auth/me');
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}

export function logout(): void {
  TokenService.removeUser();
}

export function getUser(): string {
  return TokenService.getLocalAccessToken();
}
