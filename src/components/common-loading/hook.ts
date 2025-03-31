export type ReceivedProps = Record<string, any>;

const useCommonLoading = (props: ReceivedProps) => {
  return {
    ...props,
  };
};

export type Props = ReturnType<typeof useCommonLoading>;

export default useCommonLoading;
