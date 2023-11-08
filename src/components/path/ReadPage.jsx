import React, { useContext, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../layout/MainLayout";

export default function ReadPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const { userData, setUserData } = useContext(UserContext);

//   console.log(data);
  useLayoutEffect(() => {
    if (userData == null) {
      navigate("/authentication");
    }
  }, []);

  return (
    <>
      <div className="bg-white flex justify-center items-center w-full h-screen">
        <p className="w-[75rem]">{data.shortDescription}</p>
      </div>
    </>
  );
}
