import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { getCount } from "../src/libraries/getCount.lib";
import {
  clientidManage,
  countManage,
  tokenManage,
} from "../src/libraries/recoil.lib";

function Count() {
  const [count, setCount] = useRecoilState(countManage);
  const [token, setToken] = useRecoilState(tokenManage);
  const [clientid, setClientid] = useRecoilState(clientidManage);

  useEffect(() => {
    async function count() {
      try {
        const count = await getCount(token, clientid);

        setCount(count);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new AxiosError(JSON.stringify(error));
        }
      }

      // return count;
    }

    count();
  });

  return <div>총 회원 수: {count} 명</div>;
}

export default Count;
