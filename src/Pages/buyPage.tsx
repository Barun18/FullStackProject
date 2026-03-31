

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCartStore } from "../store/useCartStore";

function BuyPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const items = location.state?.items || [];
    const [loading, setLoading] = useState(false);

    const placeOrder = async () => {
        try {
            setLoading(true);

            const res = await fetch("http://localhost:5000/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ items }),
            });

            if (!res.ok) throw new Error("Order failed");

            await useCartStore.getState().fetchCart();

            alert("Order placed successfully!");

            navigate("/profile?tab=orders");

        } catch (err) {
            console.error("Order error:", err);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="p-5">
            <h2 className="text-xl font-bold mb-4">Confirm Order</h2>

            {items.map((item: any, index: number) => (
                <div key={index}>
                    <p>Product ID: {item.productId}</p>
                    <p>Quantity: {item.quantity}</p>
                </div>
            ))}

            <button
                onClick={placeOrder}
                className="bg-green-500 px-4 py-2 mt-4"
                disabled={loading}
            >
                {loading ? "Placing..." : "Confirm Order"}
            </button>
        </div>
    );
}

export default BuyPage;