import { useState } from "react";


function CreatedAccount() {
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
            const res = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            console.log(data);
            alert("Account created successfully!");

        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="username" onChange={handleChange} placeholder="username" />
                <input name="email" onChange={handleChange} placeholder="user email" />
                <input name="password"onChange={handleChange}  placeholder="password" />
                <input name="age" onChange={handleChange} placeholder="age" />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}


export default CreatedAccount;