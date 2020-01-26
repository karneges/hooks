import { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import useLocalStorage from "./useLocalStorage";

const useFetch = url => {
  const baseUrl = "https://conduit.productionready.io/api";
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const [token] = useLocalStorage("token");

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);
  useEffect(() => {
    let skipGetRequestAfterDestroy = false;
    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : ""
        }
      }
    };
    if (!isLoading) {
      return;
    }
    Axios(`${baseUrl}${url}`, requestOptions)
      .then(res => {
        if (!skipGetRequestAfterDestroy) {
          setIsLoading(false);
          setResponse(res.data);
        }
      })
      .catch(error => {
        if (!skipGetRequestAfterDestroy) {
          setIsLoading(false);
          setError(error.response.data);
        }
      })
      return () => {
        skipGetRequestAfterDestroy=true
      }
  }, [isLoading, url, options, token]);

  return [{ isLoading, response, error }, doFetch];
};

export default useFetch;
