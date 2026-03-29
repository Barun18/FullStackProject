import { useNavigate } from "react-router-dom";

function SignOut() {
    const navigate = useNavigate();

    const handleSignOut = async (e: any) => {
        e.preventDefault();

        const res = await fetch("http://localhost:5000/signout", {
            method: "GET",
            credentials: "include"
        });
        const data = await res.json();
        alert(data.message);
        window.location.href = "/signin";
    }

    return (
        <div className="px-5 mt-3">
            <h2>Are you sure you want to Log out?</h2>
            <button
                className="bg-blue-500 px-2 py-1 mt-2"
                onClick={handleSignOut}
            >Yes
            </button>
            <button
                className="bg-blue-500 px-2 py-1 mt-2"
                onClick={() => navigate(`/`)}
            >No
            </button>
        </div>
    )
}

export default SignOut;