import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import { UserContext } from "../layout/MainLayout";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../lib/axios";
import toast from "react-hot-toast";
import { photoUpload } from "../../lib/firebase";

export default function Updateform() {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const [disabled, setDisabled] = useState(false);

  //   console.log(data)

  const imageRefs = useRef(null);
  const nameRef = useRef(null);
  const authorRef = useRef(null);
  const categoryRef = useRef(null);
  const ratingRef = useRef(null);

  useLayoutEffect(() => {
    if (userData == null) {
      navigate("/authentication");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);

    // Access field values using refs
    const imageFiles = imageRefs.current.files;
    const nameValue = nameRef.current.value;
    const authorName = authorRef.current.value;
    const categoryvalue = categoryRef.current.value;

    const ratingValue = ratingRef.current.value;

    const postData = {
      id: data._id,
      name: nameValue.toLowerCase(),
      authorName: authorName.toLowerCase(),
      category: categoryvalue.toLowerCase(),
      rating: ratingValue,
    };

    // Make a POST request using Axios
    // console.log(postData)
    axios
      .put("/update", postData)
      .then(async (data) => {
        // console.log(data.data)

        const imgLink = await photoUpload(imageFiles[0]);
        await axios
          .put("/updateimg", { id: data.data._id, img: imgLink })
          .then((data) => {
            setDisabled(false);
            console.log(data.data);
            toast.success("Book updated successfully");
          })
          .catch((err) => {
            setDisabled(false);
            // toast.error(err.);
            console.log(err);
          });
      })
      .catch((err) => {
        setDisabled(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Add book</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                  Fill up this form to update book
                </p>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col sm:w-full md:w-[25rem]">
                  <label className="leading-loose">Image</label>
                  <input
                    type="file"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Image URL"
                    ref={imageRefs}
                    multiple
                  />

                  <label className="leading-loose">Name</label>
                  <input
                    type="text"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Book name"
                    ref={nameRef}
                  />

                  <label className="leading-loose">Author Name</label>
                  <input
                    type="text"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Author name"
                    ref={authorRef}
                  />

                  <label className="leading-loose">Category</label>
                  <select
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    ref={categoryRef}
                    defaultValue={null}
                  >
                    <option value="options" disabled>
                      Options
                    </option>
                    <option value="Business & Investing">
                      Business & Investing
                    </option>
                    <option value="Computers & Technology">
                      Computers & Technology
                    </option>
                    <option value="Comic Books & Graphic Novels">
                      Comic Books & Graphic Novels
                    </option>
                    <option value="Art, Music & Photography">
                      Art, Music & Photography
                    </option>
                    {/* Add more product types as needed */}
                  </select>

                  <label className="leading-loose">Rating</label>
                  <input
                    type="number"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Rating"
                    ref={ratingRef}
                  />
                </div>
              </div>
              <div className="pt-4 flex justify-center items-center space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 disabled:bg-blue-400 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                  onClick={handleSubmit}
                  disabled={disabled === true ? true : false}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
