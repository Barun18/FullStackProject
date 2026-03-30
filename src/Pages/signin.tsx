import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn({ loadUser }: any) {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault()

        try {
            const res = await fetch("http://localhost:5000/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (!res.ok) {
                alert(data.error || "Something went wrong")
                return;
            }
            // console.log(data);
            alert("Signin successful");
            await loadUser();
            navigate("/");

        } catch (err) {
            console.error(err);
            alert("Signin failed");
        };
    }

    return (
        <div className="px-15">
            <h2>Already have an account? Sign in</h2>
            <form className="flex gap-3.5"
                onSubmit={handleSubmit}>
                <input onChange={handleChange} name="email" placeholder="user email" />
                <input onChange={handleChange} name="password" placeholder="password" />

                <button
                    className="bg-blue-500 px-2 py-1 mt-2"
                    type="submit">
                    Sign in
                </button>
                <button
                    type="button"
                    className="bg-blue-500 px-2 py-1 mt-2"
                    onClick={() => navigate("/signup")}>
                    Create an account
                </button>
            </form>
        </div>
    )
}
export default SignIn;