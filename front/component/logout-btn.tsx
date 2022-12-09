import Link from "next/link";

function LogoutBtn() {
  return (
    <div>
      <div className="flex flex-col content-center">
        <div className="flex justify-center">
          <Link href="/logout">
            <button>로그아웃하기</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LogoutBtn;
