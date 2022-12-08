import axios, { AxiosError } from "axios";
import { CountRes } from "../type/count.type";
import { DefaultResponse } from "../type/jwt.type";

export async function getCount(token: string, clientid: string) {
  try {
    const url = process.env.ADMIN_URL;

    const response = await axios.get<CountRes>(`${url}/count`, {
      headers: {
        token,
        clientid,
      },
    });

    if (response.data.resCode !== 200) {
      const returnData = "Get Count Failed";

      return returnData;
    }

    const { count } = response.data.dataRes;
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
