import { useEffect, useState, useRef, useCallback } from "react";

export const useHttpCLient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequest = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      isLoading(true);

      //Trả về một bộ điều khiển mới có tín hiệu được đặt thành đối tượng AbortSignal mới được tạo.
      const httpAbortCtrl = new AbortController();
      activeHttpRequest.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          //Trả về đối tượng AbortSignal được liên kết với đối tượng này.
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();
        activeHttpRequest.current = activeHttpRequest.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        isLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      //Yêu cầu phương thức này sẽ đặt cờ bị hủy bỏ AbortSignal của đối tượng này và báo hiệu cho bất kỳ người quan sát nào rằng hành động liên quan sẽ bị hủy bỏ.
      activeHttpRequest.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);
  return { isLoading, error, sendRequest, clearError };
};
