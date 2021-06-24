import { useCallback, useRef, useState, useEffect } from "react";
import axios from "axios";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const activeRequest = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", data = null, headers = {}, params = {}) => {
      setLoading(true);
      const abortController = new AbortController();
      activeRequest.current.push(abortController);
      try {
        const response = await axios({
          method,
          url,
          headers,
          params,
          data,
        });

        activeRequest.current = activeRequest.current.filter(
          (reqController) => reqController !== activeRequest
        );
        if (!response.status === "200" || !response.status === "201") {
          throw new Error(response.data.message);
        }
        setLoading(false);
        return response;
      } catch (error) {
        setErrorMessage(
          error.response ? error.response.data.message : "Server error"
        );
        setLoading(false);
        throw error;
      }
    },
    []
  );
  const clearError = () => {
    setErrorMessage("");
  };

  useEffect(() => {
    return () => {
      activeRequest.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return {
    loading,
    errorMessage,
    sendRequest,
    clearError,
  };
};
