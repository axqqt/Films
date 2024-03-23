/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import Axios from "axios";
import { UserData } from "../App";

const StableDiffusion = () => {
  const { loading, setLoading, status, setStatus,BASE } = useContext(UserData);
  const [prompts, setPrompts] = useState({
    Default: "",
    Negative: "",
  });

  async function stablePrompt(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await Axios.post(`${BASE}/images/stable`, {
        prompts,
      }).then((response) => setStatus(response.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setPrompts({ ...prompts }, { [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Stable Diffusion</h1>
      <form onSubmit={stablePrompt}>
        <input
          onChange={handleChange}
          name="Default"
          placeholder="Enter Default Prompt!"
          required
        />
        <input
          onChange={handleChange}
          name="Negative"
          placeholder="Enter Negative Prompt!"
        />
        <br />
        <button type="submit" placeholder="Create!" disabled={loading}>
          Create!
        </button>
      </form>
      <p>{status}</p> {/**It's not displaying that here */}
    </div>
  );
};

export default StableDiffusion;
