import useCartStore from "../store/useCartStore";
import "../Css/Cart.css"

function AllCartItem() {
    const cartItems = useCartStore((state) => state.items)
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const increse = useCartStore((state) => state.increaseQty)
    const decrese = useCartStore((state) => state.decreaseQty)

    return (
        <div className="border rounded-lg shadow p-4 flex gap-8">
            {cartItems.map((i) => (
                <div key={i.id}>
                    <img
                        src={i.img}
                        alt={i.title}
                        className="h-40 w-full object-cover rounded"
                    />
                    <h3 className="text-black">{i.title}</h3>
                    <h3 className="text-black">₹{i.price}</h3>
                    <div 
                    className="flex bg-blue-400 align-middle gap-4 font-bold pl-5">
                    <button
                    className="text-black"
                    onClick={() => decrese((i.id))}><h2 className="text-black">-</h2></button>
                    
                        <h3 className="text-red-600">Qnty:{i.quantity}</h3>

                    <button 
                    onClick={() => increse(i.id)}><h2 className="text-black">+</h2></button>
                    </div>
                    <h3 className="text-black font-bold"> Price:{(i.price) * (i.quantity)} </h3>
                </div >
            ))
            }
            <h2
                className="m-20  font-bold text-xl">
                Total Price:₹{totalPrice}
            </h2>
        </div>
    )
}

export default AllCartItem;