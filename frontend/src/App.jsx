/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./Components/Movies";
import AddFilm from "./Components/AddFilm";
import NewUser from "./Components/NewUser";
import DisplayUsers from "./Components/DisplayUsers";
import LandingPage from "./Components/Landing";
import { createContext, useEffect, useState } from "react";
import Login from "./Components/Login";
import ForgotPass from "./Components/ForgotPass";
import ChatPage from "./Components/Socket";
import Cart from "./Components/Cart";
import ViewExisting from "./Components/ViewExisting";
import IDWisePage from "./Components/IDWise";
import Navbar from "./Misc/Navbar";
import PageNotFound from "./Components/404";
import Footer from "./Misc/Footer";
import FireData from "./Components/Data";
import RingLoader from "react-spinners/RingLoader";
import NewAdminPage from "./Components/Admin/newAdmin";
import GenerateImages from "./Components/GenerateImages";
import YTSPage from "./Components/YTS";
import Scanned from "./Components/Scanned";
import Orders from "./Components/Orders";
import Comments from "./Components/Comments";
import WeatherPage from "./Components/Weather";
import "./App.css";

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

  // useEffect((next)=>{
  //   const exists = localStorage.getItem("user");
  //   if(!exists){
  //     next();
  //   }else{
  //     alert(exists);
  //   }
  // })

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
          {/**I'll customize the main component for logged and not logged in users! */}
          <Route path="/" element={<Movies />}></Route>
          <Route path="/weather" element={<WeatherPage />}></Route>
          <Route path="/comments" element={<Comments />}></Route>
          <Route path="/newuser" element={<NewUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Orders />}></Route>
          <Route path="/scan" element={<Scanned />}></Route>
          <Route path="/yts" element={<YTSPage />}></Route>
          <Route path="/generate" element={<GenerateImages />}></Route>
          <Route path="/data" element={<FireData />}></Route>
          <Route path="/socket" element={<ChatPage />}></Route>
          <Route path="/home" element={<LandingPage />} />

          <Route path="/addfilm" element={<AddFilm />} />
          <Route path="/manage" element={<DisplayUsers />} />
          <Route path="/film/:id" element={<IDWisePage />} />

          <Route path="/forgotpass" element={<ForgotPass />} />
          <Route path="/chats" element={<ChatPage />} />
          <Route path="/updateshop" element={<Cart />} />
          <Route path="/viewShop" element={<ViewExisting />} />
          <Route path="/admin" element={<NewAdminPage />}></Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer></Footer>
      </UserData.Provider>
    </BrowserRouter>
  );
}
