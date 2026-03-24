import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");

    const handleSignup = async () => {
        try{
            await axios.post("http://localhost:4000/api/auth/signup", { email,password });

            alert("Signup Successful !");
            navigate("/notes");

        } catch (err:any){
            alert(err.response?.data?.error || err.response?.data || "Signup failed !");

        } finally{
            setEmail("");
            setPassword("");
        }
    };

    return (
        <div style={{ paddingTop: "50px", textAlign: "center" }}>
            <h2>Signup</h2>

            <div style={{ marginTop: "20px" }}>
                <input 
                    type="email" 
                    value={email}
                    placeholder="Enter Email" 
                    onChange={ (e) => setEmail(e.target.value)}
                    style={{ display: "block", margin: "10px auto", padding: "8px" }}
                />

                <input 
                    type="Password" 
                    value={password}
                    placeholder="Enter password" 
                    onChange={ (e) => setPassword(e.target.value)}
                    style={{ display: "block", margin: "10px auto", padding: "8px" }}
                />

                <button 
                    onClick={handleSignup}
                    style={{ marginTop: "10px", padding: "8px 16px" }}
                > Signup </button>

                <p style={{ marginTop: "10px" }}>
                    Already have an account ? <Link to='/login'>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup ;