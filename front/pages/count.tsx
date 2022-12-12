import Link from "next/link";
import { useEffect } from "react";
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

  const counting = async () => {
    const count = await getCount(token, clientid);

    setCount(count);
  };

  useEffect(() => {
    counting();
  });

  if (
    !token ||
    !clientid ||
    token === undefined ||
    clientid === undefined ||
    token.length <= 10 ||
    clientid.length <= 8
  ) {
    return (
      <div>
        <div className="flex flex-col content-center">
          <div className="flex justify-center">
            <h1>잘못된 접속 요청입니다.</h1>
            <div className="flex justify-center">
              <Link href="/">
                <button className="btn">로그인하러가기</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col content-center">
        <div className="flex justify-center">
          <h1>총 유저 수: {count}</h1>
        </div>
      </div>
    </div>
  );
}

export default Count;
