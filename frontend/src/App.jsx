import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./Components/Movies";
import AddFilm from "./Components/AddFilm";
import NewUser from "./Components/NewUser";
import DisplayUsers from "./Components/DisplayUsers";
import LandingPage from "./Components/Landing";
import { createContext, useState } from "react";
import Login from "./Components/Login";
import ForgotPass from "./Components/ForgotPass";
import "./App.css";
import ChatPage from "./Components/Socket";
import Cart from "./Components/Cart";
import ViewExisting from "./Components/ViewExisting";
import IDWisePage from "./Components/IDWise";
import Navbar from "./Misc/Navbar";
import PageNotFound from "./Components/404";
import WhatPage from "./Components/Test";
import Footer from "./Misc/Footer";
import FireData from "./Components/Data";
import RingLoader from "react-spinners/RingLoader";
import NewAdminPage from "./Components/Admin/newAdmin";
import GenerateImages from "./Components/GenerateImages";
import YTSPage from "./Components/YTS";
import Scanned from "./Components/Scanned";

// import TestPage from "../../Test";

export const UserData = createContext();

export default function App() {
  const [data, setData] = useState({
    username: "",
    password: "",
    mail: "",
    photo: "",
  });
  const [user, setUser] = useState("");
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [id, setID] = useState("");
  const [movies, setMovies] = useState([]);

  //I didn't find the need to useCallback since i'm not passing any functions down as props through the contextAPI

  <RingLoader
    color="#36d7b7"
    height={4}
    width={100}
    loading={loading}
    speedMultiplier={1}
  />;

  return (
    <BrowserRouter>
      <UserData.Provider
        value={{
          logged,
          setLogged,
          status,
          user,
          setUser,
          setStatus,
          loading,
          setLoading,
          setID,
          id,
          data,
          setData,
          RingLoader,
          movies,
          setMovies,
        }}
      >
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Movies />}></Route>
          <Route path="/scan" element={<Scanned></Scanned>}></Route>
          <Route path="/yts" element={<YTSPage></YTSPage>}></Route>
          <Route path="/generate" element={<GenerateImages />}></Route>
          <Route path="/data" element={<FireData></FireData>}></Route>
          <Route path="/test" element={<WhatPage></WhatPage>}></Route>
          <Route path="/socket" element={<ChatPage />}></Route>
          <Route path="/home" element={<LandingPage />} />
          <Route path="/newuser" element={<NewUser />} />
          <Route path="/addfilm" element={<AddFilm />} />
          <Route path="/manage" element={<DisplayUsers />} />
          <Route path="/film/:id" element={<IDWisePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpass" element={<ForgotPass />} />
          <Route path="/chats" element={<ChatPage />} />
          <Route path="/updateshop" element={<Cart />} />
          <Route path="/viewShop" element={<ViewExisting />} />
          <Route path="/admin" element={<NewAdminPage></NewAdminPage>}></Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer></Footer>
      </UserData.Provider>
    </BrowserRouter>
  );
}
