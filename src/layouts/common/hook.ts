export type ReceivedProps = {};

const useCommonLayout = (props: ReceivedProps) => {
  return {
    ...props,
  };
};

export type Props = ReturnType<typeof useCommonLayout>;

export default useCommonLayout;
