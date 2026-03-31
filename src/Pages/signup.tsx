import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatedAccount() {
    
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        age: "",
    });

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(form),
            });

            let data;
            try {
                data = await res.json();
            } catch {
                data = {};
            }
            if (res.ok) {
                alert("Account Created Successfully.");
                navigate("/signin");
            } else {
                alert(data.error || "Something went wrong!");
            }

        } catch (err) {
            console.error(err);
            alert("Something went wrong!");
        }
    };


    return (
        <div className="pt-10 pl-3.5 bg-black">
            <form onSubmit={handleSubmit}>
                <input className="border-b-amber-200" name="username" onChange={handleChange} placeholder="username" />
                <input name="email" onChange={handleChange} placeholder="user email" />
                <input name="password" onChange={handleChange} placeholder="password" />
                <input name="phone" onChange={handleChange} placeholder="phone" />
                <input name="address" onChange={handleChange} placeholder="address" />
                <input name="city" onChange={handleChange} placeholder="city" />
                <input name="state" onChange={handleChange} placeholder="state" />
                <input name="pincode" onChange={handleChange} placeholder="pincode" />
                <input name="age" onChange={handleChange} placeholder="age" />
                <button className="bg-blue-700" type="submit">Sign Up</button>
            </form>
        </div>
    )
}


export default CreatedAccount;