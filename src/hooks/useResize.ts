import { useEffect, useState } from 'react';

export const useResize = () => {
  const [innerHeight, setInnerHeight] = useState<number>(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    function autoResize() {
      setInnerHeight(window.innerHeight - 10);
      setInnerWidth(window.innerWidth);
    }

    window.addEventListener('resize', autoResize);
    autoResize();
    return () => window.removeEventListener('resize', autoResize);
  }, []);

  return {
    innerHeight,
    innerWidth,
  };
};
