import { AuthType } from '@/constants/auth.constants';
import { CommonResponse } from '@/types/api.types';
import { RegisterResponse } from '@/types/auth.types';
import httpClient from '.';

export const localAuthService = async (body: {
  email: string;
  password: string;
}) => {
  const {
    data: { data },
  } = await httpClient.post<CommonResponse<RegisterResponse>>(
    'auth/signin',
    body,
  );

  return data;
};

export const socialOAuthService = async (body: {
  provider: AuthType;
  code: string;
  state?: string;
  redirect_uri: string;
  refCode?: string;
}) => {
  const {
    data: { data },
  } = await httpClient.post<CommonResponse<RegisterResponse>>(
    'auth/social',
    body,
  );

  return data;
};

export const registerService = async (body: {
  didToken: string;
  password: string;
  refCode?: string;
}) => {
  const {
    data: { data },
  } = await httpClient.post<CommonResponse<RegisterResponse>>(
    'auth/signup',
    body,
  );

  return data;
};
