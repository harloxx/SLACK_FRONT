//로그인 받은 후 어떻게 처리할건지
//백엔드 서버주소와 프론트 서버주소가 다르면 쿠키를 보낼수도 받을 수도 없음
//이때 설정하는게 withCredentials임
import axios from 'axios';

const fetcher = (url: string) =>
  axios
    .get(url, {
      withCredentials: true,
    })
    .then((response) => response.data);

export default fetcher;
