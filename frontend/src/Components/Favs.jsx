/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { UserData } from "../App";
import DefaultLogin from "./DefaultLogin";

const Favs = () => {
  const { setFavs, user, favs , logged,loading } = useContext(UserData);

  const myFavorites = async (filmData) => {
    const history = localStorage.getItem("favs");
    if (history) {
      const parsedData = await JSON.parse(history);
      console.log(`The users favorites are ${JSON.stringify(parsedData)}`);
      setFavs([...favs,parsedData]);
    }
    if (user) {
      setFavs([...favs, filmData]);
      localStorage.setItem("favs", favs);
    } else {
      alert("You are not logged in!");
    }
  };

  useEffect(() => {
    myFavorites();
  }, []);

  return logged && user && !loading ? (
    <div>
      <h1>My Favorites!</h1>
      {favs && favs.length ? (
        JSON.stringify(favs) 
      ) : (
        <h1>No Favorites Added!</h1> 
      )}
    </div>
  ) : <DefaultLogin/>;
};

export default Favs;
