/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Movies from "./Components/Movies";
import AddFilm from "./Components/AddFilm";
import NewUser from "./Components/NewUser";
import DisplayUsers from "./Components/DisplayUsers";
import { createContext, useState } from "react";
import Login from "./Components/Login";
import ForgotPass from "./Components/ForgotPass";
// import ChatPage from "./Components/Socket";
import IDWisePage from "./Components/IDWise";
import Navbar from "./Misc/Navbar";
import PageNotFound from "./Components/404";
import Footer from "./Misc/Footer";
import RingLoader from "react-spinners/RingLoader";
import GenerateImages from "./Components/GenerateImages";
import YTSPage from "./Components/YTS";
import "./App.css";
import Personal from "./Components/Personal";
import StableDiffusion from "./Components/StableDiffusion";
import Favs from "./Components/Favs";
import YouTube from "./Components/YouTube";

export const UserData = createContext();

export default function App() {
  const [data, setData] = useState({
    username: "",
    password: "",
    mail: "",
    image: null,
    photo: "",
  });
  const [user, setUser] = useState({});
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [id, setID] = useState("");
  const [movies, setMovies] = useState([]);
  const [favs, setFavs] = useState([]);

  //I didn't find the need to useCallback since i'm not passing any functions down as props through the contextAPI

  <RingLoader
    color="#36d7b7"
    height={4}
    width={100}
    loading={loading}
    speedMultiplier={1}
  />;

  const theData = {
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
    favs,
    setFavs,
  };

  return (
    <BrowserRouter>
      <UserData.Provider value={theData}>
        <Link to={"https://github.com/DulranSam/Films"}>
          Click here to view the repository!
        </Link>
        <Navbar />
        <Routes>
          <Route path="/" element={<Movies />}></Route>
          <Route path="/newuser" element={<NewUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/yts" element={<YTSPage />}></Route>
          <Route path="/youtube" element={<YouTube />}></Route>
          <Route path="/generate" element={<GenerateImages />} />
          <Route path="/diffusion" element={<StableDiffusion />} />
          <Route path="/addfilm" element={<AddFilm />} />
          <Route path="/manage" element={<DisplayUsers />} />
          <Route path="/film/:id" element={<IDWisePage />} />
          <Route path="/forgotpass" element={<ForgotPass />} />
          <Route path="/profile" element={<Personal />}></Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </UserData.Provider>
    </BrowserRouter>
  );
}
