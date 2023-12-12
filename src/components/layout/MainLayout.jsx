import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import { checkUser } from "../../lib/firebase";
import { useEffect, createContext, useState } from "react";
import axios from "../../lib/axios";

export const UserContext = createContext();
export default function LayoutMain() {
  // intial stage for checking user
  const [userData, setUserData] = useState("loading");
  useEffect(() => {
    checkUser(setUserData);
    axios.get("/getall").then((data) => {
      console.log("First time called");
    });
  }, []);

  return (
    <>
      <UserContext.Provider value={{ userData, setUserData }}>
        <nav>
          <Navbar />
        </nav>

        <main className="dark:bg-gray-700 bg-white">
          <Outlet />
        </main>
      </UserContext.Provider>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
