import { useCallback, useEffect, useMemo, useState } from 'react'

export function useAsyncState<AsyncResult, SomeApi extends object>(
  getAsyncResult: (api: SomeApi) => Promise<AsyncResult>
): [
  (api: Parameters<typeof getAsyncResult>[0]) => void,
  AsyncState<AsyncResult>
] {
  const [asyncStateResult, setAsyncStateResult] = useState<
    ManagedAsyncState<AsyncResult>
  >({
    timestamp: Date.now(),
    value: { type: 'empty' },
  })
  const [asyncStateProxy, setAsyncStateProxy] = useState(asyncStateResult)
  useEffect(() => {
    if (
      asyncStateProxy.timestamp >= asyncStateResult.timestamp &&
      asyncStateProxy !== asyncStateResult
    ) {
      setAsyncStateResult(asyncStateProxy)
    }
  }, [asyncStateProxy, asyncStateResult])
  const makeGetAsyncResultTrigger = useCallback(
    () => (...inputs: Parameters<typeof getAsyncResult>) => {
      const triggerTimestamp = Date.now()
      getAsyncResult(...inputs)
        .then((asyncResult) => {
          setAsyncStateProxy({
            timestamp: triggerTimestamp,
            value: {
              type: 'success',
              result: asyncResult,
            },
          })
        })
        .catch((errorMessage) => {
          setAsyncStateProxy({
            timestamp: triggerTimestamp,
            value: {
              type: 'error',
              errorMessage: errorMessage,
            },
          })
        })
      setAsyncStateProxy({
        timestamp: triggerTimestamp,
        value: { type: 'loading' },
      })
    },
    [getAsyncResult]
  )
  const getAsyncResultTrigger = useMemo(() => makeGetAsyncResultTrigger(), [
    makeGetAsyncResultTrigger,
  ])
  return [getAsyncResultTrigger, asyncStateResult.value]
}

interface ManagedAsyncState<AsyncResult> {
  timestamp: number
  value: AsyncState<AsyncResult>
}

export interface AsyncState<AsyncResult>
  extends AsyncStateBase<StrictAsyncState<AsyncResult>['type']>,
    Partial<Pick<SuccessAsyncState<AsyncResult>, 'result'>>,
    Partial<Pick<ErrorAsyncState, 'errorMessage'>> {}

type StrictAsyncState<AsyncResult> =
  | EmptyAsyncState
  | LoadingAsyncState
  | SuccessAsyncState<AsyncResult>
  | ErrorAsyncState

interface EmptyAsyncState extends AsyncStateBase<'empty'> {}

interface LoadingAsyncState extends AsyncStateBase<'loading'> {}

interface SuccessAsyncState<AsyncResult> extends AsyncStateBase<'success'> {
  result: AsyncResult
}

interface ErrorAsyncState extends AsyncStateBase<'error'> {
  errorMessage: string
}

interface AsyncStateBase<AsyncStateType extends string> {
  type: AsyncStateType
}
