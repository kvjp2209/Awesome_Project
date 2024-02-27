import {useCallback, useEffect, useRef} from 'react';
import {useDispatch as useRDDispatch} from 'react-redux';
import {AppDispatch} from '../stores/store';

const useDispatch = (): AppDispatch => {
  const signalRef = useRef<any[]>([]);
  const rdDispatch = useRDDispatch<AppDispatch>();

  const dispatch = useCallback(
    (action: any) => {
      const promise = rdDispatch(action);
      signalRef.current.push(promise);
      return promise;
    },
    [rdDispatch],
  );

  useEffect(() => {
    return () => {
      if (signalRef.current.length > 0) {
        signalRef.current.forEach((t?: {abort?: () => {}}) => {
          t?.abort?.();
        });
        signalRef.current = [];
      }
    };
  }, []);

  return dispatch;
};

export default useDispatch;
