export type ReceivedProps = Record<string, any>;

const useTyping = (props: ReceivedProps) => {
  return {
    ...props,
  };
};

export type Props = ReturnType<typeof useTyping>;

export default useTyping;
