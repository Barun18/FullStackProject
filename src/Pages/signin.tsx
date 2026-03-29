import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const navigate = useNavigate();
    const [ form, setForm ] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = async ( e:any ) => {
        e.preventDefault()
       
        try{
           const res = await fetch("http://localhost:5000/signin",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if(!res.ok){
                alert(data.error || "Something went wrong" )
                return ;
            }
            // console.log(data);
            alert("Login successful");
            navigate("/");    

        }catch(err){
            console.error(err);
            alert("Login failed");
        };
    }

    return(
        <div>
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} name="email" placeholder="user email"/>
            <input onChange={handleChange} name="password" placeholder="password"/>
            <button type="submit">Log in</button>
        </form>
    </div>
    )
}
export default SignIn;