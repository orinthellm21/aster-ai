import useProtectRouter from '@/hooks/use-protect-router';

export type ReceivedProps = Record<string, any>;

const useDashboardLayout = (props: ReceivedProps) => {
  useProtectRouter();

  return {
    ...props,
  };
};

export type Props = ReturnType<typeof useDashboardLayout>;

export default useDashboardLayout;
