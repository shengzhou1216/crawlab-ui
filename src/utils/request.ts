export const getRequestBaseUrl = (): string => {
  return process.env.VUE_APP_API_BASE_URL || 'http://localhost:8000';
};

export const getEmptyResponseWithListData = <T = any>(): ResponseWithListData<T> => {
  return {
    total: 0,
    data: [] as T[],
  } as ResponseWithListData<T>;
};
