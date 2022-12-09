import axios, { AxiosError } from "axios";
import qs from "qs";
import { SignInRes } from "../type/sign.type";

export async function signIn(email: string, password: string) {
  try {
    const url = process.env.NEXT_PUBLIC_ADMIN_URL;

    console.log(`${url}/admin/signin`);

    const bodyData = qs.stringify({
      email,
      password,
    });

    console.log("[SIGNIN] bodyData: %o", bodyData);

    const header = {
      "Content-Type": "application/x-www-form-urlencoded",
      // Authorization: authToken,
    };

    const response = await axios.post<SignInRes>(`${url}/admin/signin`, {
      data: bodyData,
      headers: header,
    });

    if (!response.data.dataRes.token || !response.data.dataRes.clientid) {
      console.log("일치하는 회원정보를 찾지 못했습니다.");

      return;
    }

    if (response.data.resCode !== 200) {
      console.log("Sign In Failed");

      return;
    }

    const { token, clientid } = response.data.dataRes;

    console.log("Found clientID: $o", clientid);

    return { token, clientid };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new AxiosError("[LOGIN] Axios Error", JSON.stringify(error));
    }

    if (error instanceof Error) {
      throw new Error("[LOGIN]", error);
    }

    throw new Error("[LOGIN]", error);
  }
}
