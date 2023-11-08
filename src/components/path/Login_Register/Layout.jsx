import React, { useState } from "react";
import Register from "./Register"
import Login from "./Login"

export default function Layout() {
  const [form, setForm] = useState("login");
  return (
    <>
      <div className="dark:bg-gray-800 bg-white flex flex-col items-center justify-center w-full h-screen text-xl dark:text-white text-black">
        <div>
          <div className="grid grid-cols-2 gap-32 mt-6">
            <button onClick={() => setForm("login")}>Login</button>
            <button className="" onClick={() => setForm("register")}>
              Register
            </button>
          </div>
        </div>
        <div className="mt-4">
          {form === "register" ? <Register /> : ""}
          {form === "login" ? <Login /> : ""}
        </div>
      </div>
    </>
  );
}
