import NewUser from "./NewUser";
import { useContext } from "react";
import { UserData } from "../App";
import Login from "./Login";

const LandingPage = () => {
  const datax = useContext(UserData);
  const { logged, setLogged, setUser } = datax;

  if (!logged) {
    return <NewUser setLogged={setLogged} setUser={setUser}></NewUser>;
  } else {
    return <Login></Login>;
  }
};

export default LandingPage;
