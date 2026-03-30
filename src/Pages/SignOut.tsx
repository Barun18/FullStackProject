import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";

type Props ={
    loadUser: (user:any) => void;
}

function SignOut({ loadUser }:Props) {
    const navigate = useNavigate();

    const handleSignOut = async (e: any) => {
        e.preventDefault();

     await fetch("http://localhost:5000/signout", {
            method: "POST",
            credentials: "include"
        });
        loadUser(null);
       useCartStore.getState().clearCart();
       alert("signout successful");
        setTimeout(() => {
            navigate("/signin");
        }, 1500);
    };

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