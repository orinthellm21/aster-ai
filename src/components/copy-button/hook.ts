import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';

export type ReceivedProps = {
  text: string;
};

const useCopyButton = (props: ReceivedProps) => {
  const { text } = props;

  const [copiedValue, copyFunc] = useCopyToClipboard();

  const [loading, setLoading] = useState(false);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    try {
      e.stopPropagation();
      e.preventDefault();

      await copyFunc(text);

      setLoading(true);
    } catch (e) {
      console.log(`🌈 ~ hook.ts:28 ~ e:`, e);
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (loading) {
      timeout = setTimeout(() => {
        setLoading(false);
      }, 1000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [loading]);

  return {
    handleClick,
    loading,
    ...props,
  };
};

export type Props = ReturnType<typeof useCopyButton>;

export default useCopyButton;
