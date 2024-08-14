import { useState, useEffect } from "react";
import { notify } from "../../../lib";
import { useSession } from "../../../providers";

interface GenericGetProps {
  errorMessage?: string;
  apiCall: Function;
}

export function useGet<T>({ errorMessage, apiCall }: GenericGetProps) {
  const { session: { token } } = useSession();
  const [data, setData] = useState<Array<T>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await apiCall({ token });
      setData(response.data);
    } catch (error) {
      notify.error(errorMessage ?? "Une erreur est survenue en chargeant les données");
      console.error(error)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { fetchData, data, isLoading }
}
