/* eslint-disable no-unused-vars */
import {useContext, useState} from 'react'
import Axios from "axios";
import {UserData} from "../App"

const StableDiffusion = () => {

    const {loading,setLoading}  = useContext(UserData)
    const [prompts,setPrompts]= useState({
        Default:"",
        Negative:""
    }) 

    async function stablePrompt(e){
        e.preventDefault();
        try{
            setLoading(true);
            await Axios.post("http://localhost:8000/images/stable",{prompts}).then(response=>console.log(response))
            
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }

    const handleChange = (e)=>{
        setPrompts({...prompts},{[e.target.name]:e.target.value})
    }


  return (
    <div>
        <h1>StableDiffusion</h1>
        <form onSubmit={stablePrompt}>
            <input onChange={handleChange} name='Default' placeholder='Enter Default Prompt!' required/>
            <input onChange={handleChange} name='Negative' placeholder='Enter Negative Prompt!' />
            <br/>
            <button type='submit' placeholder='Create!' disabled={loading}>Create!</button>
            </form>
            </div>
  )
}

export default StableDiffusion