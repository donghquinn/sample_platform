import axios, { AxiosError } from "axios";
import { createHash } from "crypto";
import Joi from "joi";
import { useRouter } from "next/router";
import qs from "qs";
import { useState } from "react";
import { DefaultResponse } from "../src/type/jwt.type";
import { RegisterForm } from "../src/type/register.type";

function SignUp() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  // const [isAdmin, setAdmin] = useState("");

  const onPasswordChange = (e) => setPassword(e.target.value);
  const onEmailChange = (e) => setEmail(e.target.value);
  const onGenderChange = (e) => setGender(e.target.value);
  const onBirthChange = (e) => setDateOfBirth(e.target.value);
  // const onAdminChnage = (e) => setAdmin(e.target.value);

  // const validateSignup = Joi.object<RegisterForm>({
  //   email: Joi.string().required(),
  //   password: Joi.string().required(),
  //   gender: Joi.string().required(),
  //   birth: Joi.string().required(),
  // });

  // const { register, handleSubmit, formState } = useForm();

  const signUpFunc = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const url = process.env.NEXT_PUBLIC_ADMIN_URL;

      // 패스워드와 합쳐서 인코딩할 값과 합칠 값
      const passwordBase = Math.round(Math.random() * 100000000);

      // 암호화
      const endcodedPassword = createHash("sha256")
        .update(password + `${passwordBase}`)
        .digest("hex");

      const header = {
        "Content-Type": "application/x-www-form-urlencoded",
      };

      // const {
      //   email: validatedEmail,
      //   password: validatedPassword,
      //   gender: validatedGender,
      //   birth: validatedBirth,
      // } = await validateSignup.validateAsync({
      //   email,
      //   endcodedPassword,
      //   gender,
      //   dateOfBirth,
      // });

      const bodyData = qs.stringify({
        email,
        password: endcodedPassword,
        gender,
        birth: dateOfBirth,
        isAdmin: 1,
      });

      // console.log(`[Register] ${bodyData}`);

      // 요청
      const result = await axios.post<DefaultResponse>(
        `${url}/admin/register`,
        {
          data: bodyData,
          headers: header,
        }
      );

      // if (result.data.resCode !== 200) {
      //   alert("회원가입 실패!");

      //   return;
      // }

      if (result.data.resCode !== 200) {
        alert("회원가입 요청 응답 오류");

        return;
      }

      // alert("회원가입 요청 완료");

      // const { dataRes, resCode } = result.data;

      // return { dataRes, resCode };

      // console.log("sign up failed");
    } catch (error) {
      alert("회원가입 요청에 문제가 있습니다.");

      if (axios.isAxiosError(error)) {
        throw new AxiosError("[SIGNUP]", JSON.stringify(error));
      }

      if (error instanceof Error) {
        throw new Error("[SIGNUP]", error);
      }

      throw new Error("[SIGNUP]", error);
    }
  };

  return (
    <div className="flex flex-col content-center">
      <div className="flex flex-row justify-center">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form
              // className="mt-8 space-y-6"
              // action="singInFunc"
              // method="POST"
              onSubmit={signUpFunc}
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  required
                  className="input input-bordered"
                  onChange={onEmailChange}
                  value={email}
                />
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  required
                  className="input input-bordered"
                  onChange={onPasswordChange}
                  value={password}
                />
                {/* <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label> */}
                <label className="label">
                  <span className="label-text">Gender</span>
                </label>
                <input
                  type="text"
                  placeholder="gender"
                  required
                  className="input input-bordered"
                  onChange={onGenderChange}
                  value={gender}
                />
                <label className="label">
                  <span className="label-text">DateOfBirth</span>
                </label>
                <input
                  type="text"
                  placeholder="YYMMDD"
                  className="input input-bordered"
                  onChange={onBirthChange}
                  value={dateOfBirth}
                />
                {/* <input type="submit"></input> */}
              </div>

              {/* <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                className="input input-bordered"
                onChange={onEmailChange}
              />
            </div> */}
              <div className="form-control mt-6">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  회원가입하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
