// react router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// components
import LayoutMain from "./components/layout/MainLayout";
import Home from "./components/path/Home";
import AddBook from "./components/path/AddBook";
import AllBooks from "./components/path/AllBooks";
import BorrowedBooks from "./components/path/BorrowedBooks";
import Autentication from "./components/path/Login_Register/Layout";

import { Toaster } from "react-hot-toast";
import BooksList from "./components/path/categoryBasedBooks/booksList";
import DetailBook from "./components/path/categoryBasedBooks/DetailBook";
import Updateform from "./components/path/Updateform";
import ReadPage from "./components/path/ReadPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutMain />,
    errorElement: (
      <div className="bg-white w-full h-screen flex justify-center items-center">
        <p className="text-[3rem] font-medium">
          <span className="text-red-700">404</span> page not found
        </p>
      </div>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/addbook",
        element: <AddBook />,
      },
      {
        path: "/books",
        element: <AllBooks />,
      },
      {
        path: "/borrowed",
        element: <BorrowedBooks />,
      },
      {
        path: "/authentication",
        element: <Autentication />,
      },
      {
        path:'/category/:id',
        element: <BooksList/>
      }, 
      {
        path: '/category/:id/:id',
        element: <DetailBook/>
      },
      {
        path: '/updateform',
        element: <Updateform/>
      },
      {
        path: '/read',
        element: <ReadPage/>
      }
    ],
  },
]);
function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
