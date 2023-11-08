import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useLayoutEffect, useState } from "react";

export default function DarkModeToggle() {
  const [darK, setDark] = useState("");
  useLayoutEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setDark("dark");
    } else {
      setDark("light");
    }
  }, []);
  const toggle = () => {
    document.documentElement.classList.toggle("dark");
    if (document.documentElement.classList.contains("dark")) {
      setDark("dark");
    } else {
      setDark("light");
    }
  };
 
  return (
    <>
      <div className="w-fit h-fit cursor-pointer" onClick={toggle}>
        {darK === "dark" ? <Brightness4Icon /> : <Brightness7Icon />}
      </div>
    </>
  );
}
