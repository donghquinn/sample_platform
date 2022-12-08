import axios, { AxiosError } from "axios";

export function kakao_login() {
  const initCode = "a534fdf1821c8d3b3368ba5d2150dba4";
  const redirectUri = "http://test.me:8000/kakao/login";
  //   Kakao.Auth.authorize({
  //     redirectUri: "{{ request.session.url }}",
  //   });
  // }
}

export async function kakaoSend() {
  try {
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new AxiosError(JSON.stringify(error));
    }
  }
}
