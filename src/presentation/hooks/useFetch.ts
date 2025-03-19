import { useCallback, useState } from "react";

interface IUseFetch<DataType, ApiArgs> {
  api: (args?: ApiArgs) => Promise<DataType>;
}
export function useFetch<DataType, ApiArgs>({
  api,
}: IUseFetch<DataType, ApiArgs>) {
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (args?: ApiArgs) => {
      setError(null);
      setLoading(true);
      try {
        const dataApi = await api(args);
        setData(dataApi);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          console.error(error);
          setError("An unknown error has occurred. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    },
    [api]
  );

  return { data, loading, error, fetchData };
}
