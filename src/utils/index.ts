import axios from 'axios';

export function configureAxios() {
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );
}

export async function getDataAPI(url: string) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    return err;
  }
}

export function formatCurrency(number: number) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
  return formatter.format(number);
}
