import axios, { AxiosError } from "axios";
import { DefaultResponse } from "../type/jwt.type";

export async function signIn(url: string, email: string, password: string) {
  try {
    const bodyData = {
      email,
      password,
    };

    const response = await axios.post<DefaultResponse>(`${url}/signin`, {
      body: { bodyData },
    });

    if (response.data.resCode !== 200) {
      return alert("Sign In Failed");
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
