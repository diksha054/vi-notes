import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Notes = ()=> {
    const navigate =useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("token");

        if(!token){
            navigate("/login");
        }
    },[]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return(
        <div>

            <div style={{ 
                display:"flex",
                justifyContent: "space-between", 
                alignItems: "center",
                padding: "10px 20px",
                borderBottom: "1px solid #ccc"
            }}>
                <h1>Vi-Notes</h1>
                <button onClick={handleLogout}>Logout</button>   
            </div>
            
            <div style={{ padding: "20px" }}>
                <textarea placeholder="Start writing here..." rows={10} cols={50} /> 
            </div>

        </div>
    );
};

export default Notes ;