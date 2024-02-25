/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import { UserData } from "../App"
import Axios from "axios";
import DefaultLogin from "./DefaultLogin";

const Personal = () => {

    const {user,logged} = useContext(UserData)
    const [userData,setUserData]  = useState([])

    async function fetchUserData() {
        try{
            const {data} = await Axios.get("http://localhost:8000/user/specific",{id:user.id});
            setUserData(data);

        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        fetchUserData();
    },[])




    return logged ? (
        <div>
          <h1>Personal</h1>
          <div>
            {userData && userData.length ? (
              userData.map((userDataItem, index) => (
                <div key={userDataItem._id || index}>
                  <h1>Username {userDataItem.username}</h1>
                  <p>{userDataItem.mail}</p>
                  {userDataItem.photo && <img src={userDataItem.photo} alt={`Image of ${userDataItem.username}`} />}
                </div>
              ))
            ) : (
              <h1>No User Data found!</h1>
            )}
          </div>
        </div>
      ) : (
        <DefaultLogin />
      );
}
      

export default Personal