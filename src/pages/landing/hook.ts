import { useEffect, useState } from 'react';

export type ReceivedProps = Record<string, any>;

const useLanding = (props: ReceivedProps) => {
  const [bgColor, setBgColor] = useState('bg-transparent');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setBgColor('bg-black shadow-lg transition duration-300');
      } else {
        setBgColor('bg-transparent');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    ...props,
    bgColor,
  };
};

export type Props = ReturnType<typeof useLanding>;

export default useLanding;
