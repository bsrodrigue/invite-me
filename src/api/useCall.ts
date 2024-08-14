import { useState } from "react";
import { notify } from "../lib";
import { StrapiError } from "../types";

function handleError(error: any) {
  notify.error(error);
  console.error(error);
}

function handleSuccess(message: string) {
  message && notify.success(message);
}

export default function useCall<R, P>(
  callback: (args?: P) => R,
  options?: {
    onSuccess?: (result?: Awaited<R>) => void,
    onError?: (result?: Awaited<any>) => void,
    successMessage?: string,
    errorMessage?: string,
  }
) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Awaited<R>>(null);

  const call = async (args?: P) => {
    try {
      setIsLoading(true);
      const data = await callback(args)
      handleSuccess(options?.successMessage);
      setData(data);
      options?.onSuccess?.(data);
      return data;
    } catch (error) {
      const strapiError = error as StrapiError;
      handleError(options?.errorMessage || strapiError?.error?.message || error || "unknown-error");
      options?.onError?.();
    }
    finally {
      setIsLoading(false);
    }
  }


  return { isLoading, call, data };
}
