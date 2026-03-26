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
                alert("Account Created Successfully.")
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
                <input name="age" onChange={handleChange} placeholder="age" />
                <button className="bg-blue-700" type="submit">Sign Up</button>
            </form>
        </div>
    )
}


export default CreatedAccount;