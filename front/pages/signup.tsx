import { AxiosError } from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { signUp } from "../src/libraries/signup";

function SignUp() {
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

  const signUpFunc = async () => {
    try {
      await signUp(email, password, gender, dateOfBirth);

      alert("회원가입 요청 완료");
    } catch (error) {
      throw new AxiosError("[SIGNUP]", JSON.stringify(error));
    }
  };

  return (
    <div className="flex flex-col content-center">
      <div className="flex flex-row justify-center">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
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
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                required
                className="input input-bordered"
                onChange={onPasswordChange}
              />
              {/* <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label> */}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <input
                type="text"
                placeholder="gender"
                required
                className="input input-bordered"
                onChange={onGenderChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">DateOfBirth</span>
              </label>
              <input
                type="text"
                placeholder="YY/MM/DD"
                className="input input-bordered"
                onChange={onBirthChange}
              />
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
              <Link href="/">
                <button className="btn btn-primary" onClick={signUpFunc}>
                  회원가입하기
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
