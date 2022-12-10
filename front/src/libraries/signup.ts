import axios, { AxiosError } from "axios";
import { createHash, randomInt } from "crypto";
import qs from "qs";
import Login from "../../pages/login";
import { DefaultResponse } from "../type/jwt.type";

// JWT 생성
export async function signUp(
  email: string,
  password: string,
  gender: string,
  dateOfBirth: string
) {
  try {
    const url = process.env.NEXT_PUBLIC_ADMIN_URL;

    // console.log(`${url}/admin/register`);

    // 패스워드와 합쳐서 인코딩할 값과 합칠 값
    const passwordBase = randomInt(8);

    console.log("passwordBase: %o", passwordBase);

    // 암호화
    const endcodedPassword = createHash("sha256")
      .update(password + `${passwordBase}`)
      .digest("hex");

    console.log("encoded Password: %o", endcodedPassword);

    const header = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const bodyData = qs.stringify({
      email,
      password: endcodedPassword,
      gender,
      birth: dateOfBirth,
      isAdmin: 1,
    });

    console.log("bodyData: %o", bodyData);

    // console.log(`[Register] ${bodyData}`);

    // 요청
    const result = await axios.post<DefaultResponse>(`${url}/admin/register`, {
      data: bodyData,
      headers: header,
    });

    // if (result.data.resCode !== 200) {
    //   alert("회원가입 실패!");

    //   return;
    // }

    console.log("response Code: %o", result.data.resCode);

    const { dataRes, resCode } = result.data;

    return { dataRes, resCode };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new AxiosError("[SignUp] Axios Error");
    }

    if (error instanceof Error) {
      throw new Error("[SignUp] Not Axios Error", error);
    }

    throw new Error("[SIGNUP] Unhandable Error", error);
  }
}
