import { CommonResponse } from '@/types/api.types';
import {
  WalletAssetsResponse,
  WalletBalanceResponse,
} from '@/types/wallet.types';
import httpClient from '.';

export const walletBalanceService = async (params: { address: string }) => {
  const {
    data: { data },
  } = await httpClient.get<CommonResponse<WalletBalanceResponse>>(
    `wallet/balance/${params.address}`,
  );

  return data;
};

export const walletAssetsService = async (params: { address: string }) => {
  const {
    data: { data },
  } = await httpClient.get<CommonResponse<WalletAssetsResponse>>(
    `wallet/portfolio/${params.address}`,
  );

  return data;
};
