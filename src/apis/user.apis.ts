import { CommonResponse } from '@/types/api.types';
import { GetUserResponse } from '@/types/user.types';
import httpClient from '.';

export const getUserService = async () => {
  const {
    data: { data },
  } = await httpClient.get<CommonResponse<GetUserResponse>>('user');

  return data;
};
