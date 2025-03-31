import { SignalResponse, TrendingResponse } from '@/types/alert.types';
import { CommonResponse } from '@/types/api.types';
import httpClient from '.';

export const getTrendingService = async () => {
  const {
    data: { data },
  } = await httpClient.get<CommonResponse<TrendingResponse>>('trending');

  return data;
};

export const getSignalService = async (params: {
  limit: number;
  offset: number;
}) => {
  const {
    data: { data },
  } = await httpClient.get<CommonResponse<SignalResponse>>('signal', {
    params,
  });

  return data;
};
