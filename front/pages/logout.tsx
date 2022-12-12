import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { clientidManage, tokenManage } from "../src/libraries/recoil.lib";

function Logout() {
  const router = useRouter();
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
          <button
            className="btn"
            onClick={() => {
              router.push("/");
            }}
          >
            로그아웃이 완료되었습니다.
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
