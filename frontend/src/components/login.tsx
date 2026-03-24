import axios from "axios";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");

    const handleLogin = async () => {
        try{
            const res = await axios.post("http://localhost:4000/api/auth/login", { 
                email:email.trim(),
                password : password.trim() 
            });
            localStorage.setItem("token",res.data.token);

            alert("Login Successful !");
            navigate("/notes");

        } catch (err:any){
            alert(err.response?.data?.error || (
                typeof err.response?.data === "string" ? err.response.data : null ) || 
                "Login failed !");

        } finally{
            setEmail("");
            setPassword("");
        }
    };

    return(
        <div style={{ paddingTop: "50px", textAlign: "center" }}>
            <h2>Login</h2>

            <div style={{ marginTop: "20px" }}>
                <input 
                    type="email" 
                    value = {email}
                    placeholder="Enter Email" 
                    onChange={ (e) => setEmail(e.target.value)}
                    style={{ display: "block", margin: "10px auto", padding: "8px" }}
                />

                <input 
                    type="Password" 
                    value = {password}
                    placeholder="Enter password" 
                    onChange={ (e) => setPassword(e.target.value)}
                    style={{ display: "block", margin: "10px auto", padding: "8px" }}
                />

                <button 
                    onClick={handleLogin} 
                    style={{ marginTop: "10px", padding: "8px 16px" }}
                > Login </button>

                <p style={{ marginTop: "10px" }}>
                    Don't have an account? <Link to="/">Signup</Link>
                </p>
            </div>
        </div>
    );
};

export default Login ; 