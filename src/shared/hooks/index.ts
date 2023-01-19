import { useEffect, useRef } from "react";
import { UseFormReturn } from "react-hook-form";

/**
 * @param state - Errors.
 * @param callback - Callback.
 */
export function useSubscribeError<T>(
  state: UseFormReturn<T>,
  callback: (errors: UseFormReturn<T>['formState']['errors']) => void,
): void {
  const callBackRef = useRef(callback);
  callBackRef.current = callback;

  useEffect(() => {
    if (Object.keys(state.formState.errors).length > 0) {
      callBackRef.current(state.formState.errors);
    }
  }, [state.formState.errors]);
}
