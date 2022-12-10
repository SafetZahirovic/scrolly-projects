import { useRef, useEffect } from 'react';

const useIsMounted = () => {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
        isMounted.current = false
    };
  }, []);
  return isMounted.current;
};

export default useIsMounted;