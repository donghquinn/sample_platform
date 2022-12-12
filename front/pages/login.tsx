import { LockClosedIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";
import Logo from "../public/img/logo.png";
import {
  clientidManage,
  emailManage,
  passwordManage,
  tokenManage,
} from "../src/libraries/recoil.lib";
import { SignInRes } from "../src/type/sign.type";

function Login() {
  const router = useRouter();

  const [email, setEmail] = useRecoilState(emailManage);
  const [password, setPassword] = useRecoilState(passwordManage);

  const [token, setToken] = useRecoilState(tokenManage);
  const [clientid, setClientid] = useRecoilState(clientidManage);

  // 패스워드, 이메일 입력
  const onEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  // const validateSingin = Joi.object<SignInRequest>({
  //   email: Joi.string().required(),
  //   password: Joi.string().required(),
  // });

  const signInFunc = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = process.env.NEXT_PUBLIC_ADMIN_URL;

    // const { email: validatedEmail, password: validatedPassword } =
    //   await validateSingin.validateAsync({ email, password });

    const bodyData = {
      email: email,
      password: password,
    };

    const header = {
      "Content-Type": "application/x-www-form-urlencoded",
      // Authorization: authToken,
    };

    const response = await axios.post<SignInRes>(`${url}/admin/signin`, {
      data: bodyData,
      headers: header,
    });

    const { queryToken, queryClientId } = response.data.dataRes;

    console.log({ queryToken, queryClientId });

    setToken(queryToken);
    setClientid(queryClientId);

    alert("로그인 성공");

    if (queryClientId.length >= 2 && queryToken.length >= 2) {
      router.push("/count");
    } else {
      alert("로그인 실패");
      router.push("/");
    }
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Image src={Logo} alt="mainlogo"></Image>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form
            // className="mt-8 space-y-6"
            // action="singInFunc"
            // method="POST"
            onSubmit={signInFunc}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  onChange={onEmailChange}
                  value={email}
                />

                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  onChange={onPasswordChange}
                  value={password}
                />
                {/* <input type="submit"></input> */}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label> */}
              </div>

              <div className="text-sm">
                <Link
                  href="/signup"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign Up
                </Link>
              </div>

              {/* <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div> */}
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                style={{ backgroundColor: "#df5f3c" }}
                onClick={() => {
                  signInFunc;
                }}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 white group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                로그인
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
