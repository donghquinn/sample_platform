import Link from "next/link";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { clientidManage, tokenManage } from "../src/libraries/recoil.lib";

function LogOut() {
  const [token, setToken] = useRecoilState(tokenManage);
  const [clientid, setClientid] = useRecoilState(clientidManage);

  useEffect(() => {
    setToken("");
    setClientid("");
  });

  return (
    <div>
      <div className="flex flex-col content-center">
        <div className="flex justify-center">
          <Link href="/">
            <button>로그아웃이 완료되었습니다.</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LogOut;
