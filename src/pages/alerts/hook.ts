import { getSignalService } from '@/apis/alert.apis';
import { SignalResponse } from '@/types/alert.types';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export type ReceivedProps = Record<string, any>;

const useAlertsPage = (props: ReceivedProps) => {
  const [offset, setOffSet] = useState<number>(0);
  const [data, setData] = useState<SignalResponse>([]);

  const signal = useQuery({
    queryKey: ['signal', offset],
    queryFn: () => {
      return getSignalService({
        limit: 30,
        offset: offset * 30,
      });
    },
  });

  useEffect(() => {
    setData([...data, ...(signal?.data || [])]);
  }, [signal?.data]);

  return {
    alert,
    signal,
    data,
    setOffSet,
    offset,
    ...props,
  };
};

export type Props = ReturnType<typeof useAlertsPage>;

export default useAlertsPage;
