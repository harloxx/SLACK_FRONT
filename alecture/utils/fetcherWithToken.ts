import axios from 'axios';

//token fetcher
//api 요청시에 auth token을 넘겨야하는 상황

//axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

const fetcherWithToken = (url: string, token: any) =>
  axios
    .get(url, {
      headers: {
        Authorization: token,
      },
    })
    .then((result) => result.data);

export default fetcherWithToken;
