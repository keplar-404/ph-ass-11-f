import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import axios from "./axios";
import Cookies from "js-cookie";
// import config from "./config";

const firebaseConfig = {
  apiKey: "AIzaSyCAz_lEV49bBnadpK4Sa0mDOb6zURFhQ2s",
  authDomain: "ecom-keplar.firebaseapp.com",
  projectId: "ecom-keplar",
  storageBucket: "ecom-keplar.appspot.com",
  messagingSenderId: "185069600372",
  appId: "1:185069600372:web:96a071924545677a86db21",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// generate jwt token
const jwtGenerate = (uid, email) => {
  axios
    .post("http://127.0.0.1:5000/jwt", {
      id: uid,
      email: email,
    })
    .then((data) => {
      Cookies.set("accessToken", data.data.accessToken);
      Cookies.set("refreshToken", data.data.refreshToken);
    })
    .catch((err) => toast.error(err.message));
};

// login
export const login = (email, password, setBtnDisable, setUserData) => {
  setBtnDisable(true);

  const Email = email.current.value;
  const Password = password.current.value;

  signInWithEmailAndPassword(auth, Email, Password)
    .then((user) => {
      toast.success("Login successfull");
      setBtnDisable(false);
      // generate jwt token
      jwtGenerate(user.user.uid, user.user.email);
      setUserData({
        email: user.user.email,
        photo: user.user.photoURL,
      });
    })
    .catch((err) => {
      const error = err.message;
      const match = error.match(/\(auth\/(.+?)\)/);
      const message = match[1];
      toast.error(message);

      setBtnDisable(false);
    });
};

// photo upload
export const photoUpload = async (photo) => {
  const storage = getStorage(app);
  const storageRef = ref(storage, "images/" + photo.name);

  // Upload the file to Firebase Storage
  try {
    await uploadBytes(storageRef, photo);

    // Get the download URL of the uploaded file
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading photo:", error);
    return;
  }
};

// handle user register function
export const handleRegistration = async (
  email,
  password,
  setBtnDisable,
  photo
) => {
  try {
    // Create the user account
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = await userCredential.user;

    // Update the user's photoURL
    const photoURL = await photoUpload(photo);
    await updateProfile(user, { photoURL });

    // Success
    toast.success("Registered successfully. Please log in.");
    await setBtnDisable(false);
    //   window.location.reload();
  } catch (err) {
    const error = err.message;
    const match = error.match(/\(auth\/(.+?)\)/);
    const message = match[1];
    toast.error(message);
    await setBtnDisable(false);
  }
};

// google sign in
const provider = new GoogleAuthProvider();
export const handleGoogleSignIn = (setUserData) => {
  signInWithPopup(auth, provider)
    .then((data) => {
      toast.success("Login successfull");
      // generate jwt token
      jwtGenerate(data.user.uid, data.user.email);
      setUserData({
        email: data.user.email,
        photo: data.user.photoURL,
      });
    })
    .catch((err) => {
      const error = err.message;
      const match = error.match(/\(auth\/(.+?)\)/);
      const message = match[1];
      toast.error(message);
    });
};

//   check user
export const checkUser = (setUserData) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserData({
        photo: user.photoURL,
        email: user.email,
      });
      jwtGenerate(user.uid, user.email);
    } else {
      setUserData(null);
    }
  });
};

// log out user
export const logoutUser = (setUserData) => {
  signOut(auth)
    .then(() => {
      setUserData(null);
      toast.success("Log out successfully");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    })
    .catch((err) => toast.error(err.message));
};
