import Link from "next/link";
import React, { useState } from "react";
import { signUp } from "../src/libraries/signup";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isAdmin, setAdmin] = useState("");

  const onPasswordChange = (e) => setPassword(e.target.value);
  const onEmailChange = (e) => setEmail(e.target.value);
  const onGenderChange = (e) => setGender(e.target.value);
  const onBirthChange = (e) => setDateOfBirth(e.target.value);
  const onAdminChnage = (e) => setAdmin(e.target.value);

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
                className="input input-bordered"
                onChange={onEmailChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                placeholder="password"
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
                placeholder="birth"
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
              <button
                className="btn btn-primary"
                onClick={async () => {
                  try {
                    await signUp(email, password, gender, dateOfBirth);

                    return (
                      <div>
                        <div className="flex flex-col content-center">
                          <div className="flex justify-center">
                            <h1>회원가입 완료</h1>
                            <Link href="/">
                              <button>확인</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  } catch (error) {
                    return (
                      <div>
                        <div className="flex flex-col content-center">
                          <div className="flex justify-center">
                            <h1>SignUp Request Error</h1>
                            <Link href="/signup">
                              <button>다시 요청</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  }
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
