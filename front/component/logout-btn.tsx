import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import {
  clientidManage,
  loginManage,
  tokenManage,
} from "../src/libraries/recoil.lib";

function LogoutBtn() {
  const router = useRouter();

  const [token, setToken] = useRecoilState(tokenManage);
  const [login, setLogin] = useRecoilState(loginManage);
  const [clientid, setClientid] = useRecoilState(clientidManage);

  return (
    <div>
      <div className="flex flex-col content-center" style={{ margin: 30 }}>
        <div className="flex justify-center">
          <button
            className="btn"
            onClick={() => {
              setToken("");
              setClientid("");

              setLogin(false);

              alert("로그아웃 되었습니다.");

              router.push("/");
            }}
          >
            로그아웃하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutBtn;
