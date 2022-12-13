import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  clientidManage,
  loginManage,
  tokenManage,
} from "../src/libraries/recoil.lib";

function Logout() {
  const router = useRouter();
  const [token, setToken] = useRecoilState(tokenManage);
  const [clientid, setClientid] = useRecoilState(clientidManage);
  const [login, setLogin] = useRecoilState(loginManage);

  useEffect(() => {
    setToken("");
    setClientid("");

    setLogin(false);

    alert("로그아웃 되었습니다.");
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
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
