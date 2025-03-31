export type ReceivedProps = Record<string, any>;

const useWalletButton = (props: ReceivedProps) => {
  return {
    ...props,
  };
};

export type Props = ReturnType<typeof useWalletButton>;

export default useWalletButton;
