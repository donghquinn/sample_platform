import { useEffect } from "react";
import { useRecoilState } from "recoil";
import LogoutBtn from "../component/logout-btn";
import { getCount } from "../src/libraries/getCount.lib";
import {
  clientidManage,
  countManage,
  loginManage,
  tokenManage,
} from "../src/libraries/recoil.lib";

function Count() {
  const [count, setCount] = useRecoilState(countManage);

  const [token, setToken] = useRecoilState(tokenManage);
  const [clientid, setClientid] = useRecoilState(clientidManage);
  // const [login, setLogin] = useRecoilState(loginManage);

  const counting = async () => {
    // console.log("token: %o", token);
    // console.log("clientId: %o", clientid);

    const count = await getCount(token, clientid);

    setCount(count);
  };

  useEffect(() => {
    counting();
  });

  return (
    <div>
      <div className="flex flex-col content-center">
        <div className="flex justify-center">
          <h1>총 유저 수: {count}</h1>
        </div>
      </div>
      <LogoutBtn></LogoutBtn>
    </div>
  );
}

export default Count;
