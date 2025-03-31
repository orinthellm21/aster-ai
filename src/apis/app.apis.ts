import { CommonResponse } from '@/types/api.types';
import httpClient from '.';

export const settingsService = async () => {
  const {
    data: { data },
  } = await httpClient.get<
    CommonResponse<{
      sign_msg: string;
      contract_address: string;
      native_usd_price: number;
      sol_receive_address: string;
    }>
  >(`/setting`, {
    params: {},
  });

  return data;
};
