import axios, { AxiosError } from "axios";
import { CountRes } from "../type/count.type";
import { DefaultResponse } from "../type/jwt.type";

export async function getCount(token: string, clientid: string) {
  try {
    const url = process.env.NEXT_PUBLIC_ADMIN_URL;

    // TODO header content-type: x-www-form-urlencoded로 바꿔야할지 지켜보자.
    const header = {
      "Content-Type": "application/json",
      Authorization: token,
      clientid: clientid,
      // clientid,
    };

    const response = await axios.get<CountRes>(`${url}/admin/count`, {
      headers: header,
    });

    if (response.data.resCode !== 200) {
      const returnData = `Get Count Failed: ${response.data.resCode}`;

      console.log(returnData);

      return returnData;
    }

    const { count } = response.data.dataRes;

    console.log(count);

    return count;
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
