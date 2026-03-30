import { useEffect, useState } from "react";

function Orders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/orders", {
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => setOrders(data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading orders...</p>;

    if (orders.length === 0) return <p>No orders yet</p>;

    return (
        <div className="flex flex-col gap-4">
            {orders.map((order) => (
                <div key={order.id} className="border p-3 rounded">

                    <p><strong>Order ID:</strong> {order.id}</p>
                    <p><strong>Total:</strong> ₹{order.total}</p>
                    <p><strong>Status:</strong> {order.status}</p>

                    <div className="mt-2">
                        <strong>Items:</strong>
                        {order.items.map((item: any) => (
                            <div key={item.id} className="ml-3">
                                <p>
                                    {/* Product ID: {item.productId} | Qty: {item.quantity} */}

                                    {order.items.map((item: any) => (
                                        <div key={item.id} className="ml-3 flex gap-3 items-center">

                                            <img src={item.product.img} className="w-12 h-12" />

                                            <div>
                                                <p>{item.product.title}</p>
                                                <p>₹{item.product.price} * {item.quantity}</p>
                                            </div>

                                        </div>
                                    ))}
                                </p>
                                <span className="text-green-600">{order.status}</span>
                            </div>
                        ))}
                    </div>

                </div>
            ))}
        </div>
    );
}

export default Orders;