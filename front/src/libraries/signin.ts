import axios, { AxiosError } from "axios";
import { DefaultResponse } from "../type/jwt.type";
import { SignInRes } from "../type/sign.type";

export async function signIn(email: string, password: string) {
  try {
    const url = process.env.ADMIN_URL;

    const bodyData = {
      email,
      password,
    };

    const response = await axios.post<SignInRes>(`${url}/admin/signin`, {
      body: { bodyData },
    });

    if (!response.data.dataRes.token || !response.data.dataRes.clientid) {
      alert("일치하는 회원정보를 찾지 못했습니다.");

      return;
    }

    if (response.data.resCode !== 200) {
      alert("Sign In Failed");
      return;
    }

    const { token, clientid } = response.data.dataRes;

    return { token, clientid };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new AxiosError("[SignUp] Axios Error");
    }

    if (error instanceof Error) {
      throw new Error("[SignUp]", error);
    }

    throw new Error("[SIGNUP]", error);
  }
}
