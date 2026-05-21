import React from "react";

const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const request = React.useCallback(async (url, options) => {
    let response;
    let json;
    try {
      setLoading(true);
      setError(null);
      response = await fetch(url, options);
      json = await response.json();
      if (!response.ok) throw new Error(json.message);
      return { response, json };
    } catch (err) {
      json = null;
      setError(err.message);
    } finally {
      setData(json);
      console.log(json)                                       // Ao fim tirar isso aqui
      setLoading(false);
    }
  }, []);

  return {
    data,
    error,
    loading,
    request,
  };
};

export default useFetch;
