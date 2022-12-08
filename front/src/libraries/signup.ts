import axios, { AxiosError } from "axios";
import { createHash, randomInt } from "crypto";
import { DefaultResponse } from "../type/jwt.type";

// JWT 생성
export async function signUp(url: string, email: string, password: string) {
  try {
    // 패스워드와 합쳐서 인코딩할 값과 합칠 값
    const passwordBase = String(randomInt(8));

    // 암호화
    const endcodedPassword = createHash("sha256")
      .update(password + passwordBase)
      .digest("hex");

    const bodyData = {
      email,
      password: endcodedPassword,
    };

    // 요청
    const result = await axios.post<DefaultResponse>(`${url}/register`, {
      body: { bodyData },
    });

    if (result.data.resCode !== 200) {
      return alert("회원가입 실패!");
    }

    const { dataRes } = result.data;
    return dataRes;
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
