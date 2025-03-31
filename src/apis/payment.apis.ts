import { CommonResponse } from '@/types/api.types';
import httpClient from '.';

export const createPaymentSwapService = async (body: {
  inputTokenCA: string;
  outputTokenCA: string;
  amount: string;
}) => {
  const {
    data: { data },
  } = await httpClient.post<CommonResponse<{ txid: string }>>(
    'payment/swap',
    body,
  );

  return data;
};

export const createPaymentActiveAccountService = async () => {
  const {
    data: { data },
  } = await httpClient.post<
    CommonResponse<{ total_price: number; msg: string }>
  >('payment/active-account');

  return data;
};

export const createPaymentTransferService = async (body: {
  receiveAddress: string;
  amount: number;
}) => {
  const {
    data: { data },
  } = await httpClient.post<CommonResponse<{ txid: string }>>(
    `payment/transfer`,
    body,
  );

  return data;
};
