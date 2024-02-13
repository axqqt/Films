import { useContext } from "react";
import { UserData } from "../App";

const ForgotPass = () => {
  const { status, setStatus, loading, setLoading, data, setData, RingLoader } = useContext(UserData);


  const ForgotPass = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const r = await ForgotPass(data);
      if (r.status === 200) {
        setStatus("Password Reset! 👍🏻");
        setTimeout(() => {
          navigator("/login");
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <p>Fill this 👇🏻 to update your password!</p>
      <form onSubmit={ForgotPass}>
        <input
          onChange={handleChange}
          name="mail"
          placeholder="Enter email"
        ></input>
        <input
          onChange={handleChange}
          name="password"
          placeholder="Enter Updated Password"
        ></input>
        <button disabled={loading}>
          {loading ? <RingLoader/> : "Forgot Password"}
        </button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default ForgotPass;
