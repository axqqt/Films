/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./Components/Movies";
import AddFilm from "./Components/AddFilm";
import NewUser from "./Components/NewUser";
import DisplayUsers from "./Components/DisplayUsers";
import LandingPage from "./Components/Landing";
import { createContext,  useState } from "react";
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
import Comments from "./Components/Comments";
import "./App.css";
import Personal from "./Components/Personal";


export const UserData = createContext();

export default function App() {
  const [data, setData] = useState({
    username: "",
    password: "",
    mail: "",
    photo: "",
  });
  const [user, setUser] = useState({});
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
   
  }


  return (
    <BrowserRouter>
      <UserData.Provider
        value={theData}
      >
        <Navbar/>
        <Routes>
          {/**I'll customize the main component for logged and not logged in users! */}
          <Route path="/" element={<Movies />}></Route>
          <Route path="/newuser" element={<NewUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/comments" element={<Comments />}></Route>  
          <Route path="/yts" element={<YTSPage />}></Route>
          <Route path="/generate" element={<GenerateImages />}></Route>
          <Route path="/home" element={<LandingPage />} />
          <Route path="/addfilm" element={<AddFilm />} />
          <Route path="/manage" element={<DisplayUsers />} />
          <Route path="/film/:id" element={<IDWisePage />} />
          <Route path="/forgotpass" element={<ForgotPass />} />
          <Route path="/profile" element={<Personal/>}></Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer/>
      </UserData.Provider>
    </BrowserRouter>
  );
}
