import React, { useContext, useRef, useState } from "react";
import { handleGoogleSignIn, login } from "../../../lib/firebase";
import { Button } from "@mui/material";
import { UserContext } from "../../layout/MainLayout";

export default function Login() {
  const email = useRef("");
  const password = useRef("");
  const [btnDisable, setBtnDisable] = useState(false);
  const { userData, setUserData } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password, setBtnDisable, setUserData);
  };

  return (
    <>
      <div className="w-full max-w-xs">
        <form className="dark:bg-gray-700 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block dark:text-white text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full text-[1rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="example@gmail.com"
              ref={email}
            />
          </div>
          <div className="mb-6">
            <label
              className="block dark:text-white text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full text-[1rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              ref={password}
              placeholder="******"
            />
          </div>
          <div className="flex gap-4 items-center justify-center">
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={btnDisable ? true : false}
            >
              Login
            </Button>

            {/* google */}
            <Button
              type="button"
              onClick={() => handleGoogleSignIn(setUserData)}
              variant="outlined"
            >
              Login Google
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
