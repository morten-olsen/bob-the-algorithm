import { useCallback, useEffect, useMemo, useState } from "react"

type AsyncCallbackOutput<TArgs extends any[], TResult> = [
  (...args: TArgs) => Promise<TResult>,
  {
    loading: boolean;
    error?: any;
    result?: TResult;
    args?: TArgs;
  }
];

type AsyncOutput<TResult> = [
  TResult | undefined,
  {
    loading: boolean;
    error?: any;
    rerun: () => Promise<TResult>;
  }
]

const useAsyncCallback = <
  TArgs extends any[],
  TResult,
>(fn: (...args: TArgs) => Promise<TResult>, deps: any[]): AsyncCallbackOutput<TArgs, TResult> => {
  const [result, setResult] = useState<TResult>();
  const [prevArgs, setPrevArgs] = useState<TArgs>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();

  const action = useCallback(fn, deps);
  
  const invoke = useCallback(
    async (...args: TArgs) => {
      setLoading(true);
      setError(false);
      setPrevArgs(args);
      try {
        const output = await action(...args);
        setResult(output);
        return output;
      } catch (err) {
        setResult(undefined);
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, setResult, action],
  );

  const options = useMemo(
    () => {
      const output: AsyncCallbackOutput<TArgs, TResult> = [
        invoke,
        {
          result,
          loading,
          error,
          args: prevArgs,
        }
      ];
      return output;
    },
    [invoke, result, loading, error, prevArgs],
  );

  return options;
};

const useAsync = <TResult>(fn: () => Promise<TResult>, deps: any[]): AsyncOutput<TResult> => {
  const [invoke, options] = useAsyncCallback(fn, deps);
  useEffect(
    () => {
      invoke();
    },
    [invoke],
  );

  const localOptions = useMemo(
    () => ({
      loading: options.loading,
      error: options.error,
      rerun: invoke,
    }),
    [invoke, options.loading, options.error],
  );

  return [
    options.result,
      localOptions,
  ]
};

export type { AsyncCallbackOutput };
export { useAsync, useAsyncCallback };
