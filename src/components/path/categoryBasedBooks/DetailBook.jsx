import Button from "@mui/material/Button";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BasicModal from "../../shared/Model";
import axios from "../../../lib/axios";
import { UserContext } from "../../layout/MainLayout";

export default function DetailBook() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  //   console.log(data);
  const [btn, setBtn] = useState([]);
  const { userData, setUserData } = useContext(UserContext);

  //   console.log(data._id)
  useLayoutEffect(() => {
    if (userData == null) {
      navigate("/authentication");
    } else {
      axios
        .post("/findBorrow", {
          name: data.name,
          gmail: userData?.email,
        })
        .then((data) => {
          setBtn(data.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className="w-full pt-7 flex flex-col justify-center items-center dark:text-white text-black">
      <img src={data.images} alt={data.name} className="w-auto h-[25rem]" />
      <div className="w-[25rem] gap-6 mt-7">
        <p className="text-xl ">{data.name}</p>
        <p className="text-base">
          <span className="font-bold">Description:</span>{" "}
          {data.shortDescription.slice(0, 75)}
        </p>
        <p>Quentity: {data.quantity}</p>
        <p>Rating: {data.rating[0]}</p>
      </div>
      {/* {console.log(data.quantity)} */}
      <div className="flex gap-4 mt-6 mb-6">
        {btn.length == 0 && data.quantity > 0 ? (
          <BasicModal disable={false} bookData={data} userData={userData} />
        ) : (
          <BasicModal disable={true} bookData={data} userData={userData} />
        )}

<Link to={`/read`} state={data}>
        <Button variant="outlined">Read</Button>
</Link>
      </div>
    </div>
  );
}
