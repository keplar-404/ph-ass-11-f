import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { handleRegistration } from "../../../lib/firebase";
import { Button } from "@mui/material";

export default function Register() {
  const email = useRef("");
  const password = useRef("");
  const photo = useRef("");
  const [btnDisable, setBtnDisable] = useState(false);

  const handleSubmit = () => {
    setBtnDisable(true);
    const Email = email.current.value;
    const Password = password.current.value;
    const Photo = photo.current.files[0];
    const isLengthValid = Password.length >= 6;
    const hasUpperCase = /[A-Z]/.test(Password);
    const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(
      Password
    );

    if (!Email.includes("@")) {
      toast.error("Input valid email");
      setBtnDisable(false);
      return;
    }
    if (!isLengthValid) {
      toast.error("Password should be at least 6 characters long");
      setBtnDisable(false);
      return;
    }
    if (!hasUpperCase) {
      toast.error("Add at least one capital letter");
      setBtnDisable(false);
      return;
    }
    if (!hasSpecialCharacter) {
      toast.error("Add at least one special character");
      setBtnDisable(false);
      return;
    }

    if (!Photo || !Photo.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      setBtnDisable(false);
      return;
    }

    handleRegistration(Email, Password, setBtnDisable, Photo);
  };

  return (
    <>
      <div className="w-full max-w-xs">
        <form className="bg-white dark:bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
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

            <input
              type="file"
              ref={photo}
              required
              className="text-[1rem] mt-3"
            />
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={btnDisable ? true : false}
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
