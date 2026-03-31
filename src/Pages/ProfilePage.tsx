import { useState, useEffect } from "react";
import BasicInfo from "./BasicInfo";
import Orders from "./Orders";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function ProfilePage() {
    
    const [tab, setTab] = useState<"profile" | "orders">("profile");
    const [ searchParams ] = useSearchParams();

    const navigate = useNavigate();

    useEffect(() => {
        const queryTab = searchParams.get("tab");
        if(queryTab === "orders"){
            setTab("orders");
        }else {
            setTab("profile");
        }
    },[searchParams]);

    return (
        <div className="p-5">
            <h2 className="text-xl font-bold mb-4">
                My Profile
            </h2>

            <div className="flex gap-4 mb-4">
                <button
                    onClick={() => setTab("profile")}
                    className={`px-3 py-1 rounded ${tab === "profile" ? "bg-blue-500 text-black" : "bg-gray-200"
                        }`}>
                    Basic Info
                </button>

                <button
                    onClick={() => {
                        setTab("orders");
                        navigate("/profile?tab=orders")
                    }
                }
                    className={`px-3 py-1 rounded ${tab === "orders" ? "bg-blue-500 text-black" : "bg-gray-200"
                        }`}>
                    Orders
                </button>
            </div>

            { tab === "profile" && <BasicInfo /> }
            { tab === "orders" && <Orders />}
        </div>
    )
}
export default ProfilePage;