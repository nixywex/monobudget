import { useState } from "react";

const useStatus = () => {
  type statusInterface = "loading" | "success" | "error";

  const [status, setStatus] = useState<statusInterface | null>(null);
  const [error, setError] = useState<Error | null>(null);

  return { status, setStatus, error, setError };
};

export default useStatus;
