import { useState } from "react";

interface PostState {
  response: Result;
  error: Error | null;
  isLoading: boolean;
}

interface Result {
  message: string;
}

export const usePost = <T>(
  path: string
): [(data: T) => Promise<void>, PostState] => {
  const [response, setResponse] = useState<Result>({ message: "" });
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const postData = async (data: T): Promise<void> => {
    console.log("data", data);
    setIsLoading(true);
    try {
      const res = await fetch(path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!(res.status === 200 || res.status === 201))
        throw new Error(res.statusText);

      const result: Result = await res.json();

      setResponse({ message: result.message });
  
    } catch (err) {
      if (err instanceof Error) setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return [postData, { response, error, isLoading }];
};
