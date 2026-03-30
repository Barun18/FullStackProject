import { useState } from "react";
import BasicInfo from "./BasicInfo";
import Orders from "./Orders";

function ProfilePage() {
    const [tab, setTab] = useState<"profile" | "orders">("profile");

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
                    onClick={() => setTab("orders")}
                    className={`px-3 py-1 rounded ${tab === "orders" ? "bg-blue-500 text-black" : "bg-gray-200"
                        }`}>
                    Orders
                </button>
            </div>

        </div>
    )
}
export default ProfilePage;