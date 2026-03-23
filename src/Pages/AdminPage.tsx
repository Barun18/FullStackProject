import { useEffect, useState } from "react";
import type { Product } from "../Type/product";
import { getProductData } from "../services/Api";
import { useNavigate } from "react-router-dom";

function AdminPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const allProducts = getProductData();
        setProducts(allProducts);
    }, []);

    const handleDelete = ((id: number) => {
        const storedProduct = JSON.parse(localStorage.getItem("products") || "[]");
        const updatedProduct = storedProduct.filter((p: Product) => p.id !== id);
        localStorage.setItem("products", JSON.stringify(updatedProduct));
        setProducts(getProductData())
    })

    return (
        <div>
            {
                products.map((product) => (
                    <div key={product.id}
                        className="flex items-center 
                        gap-4 border p-3" >
                        <div className="text-black font-bold">
                            <img src={product.img} width={80} />
                            <h3>{product.title}</h3>
                            <p>₹{product.price}</p>
                            <p>{product.category}</p>
                        </div>
                        <div
                            className="bg-blue-400 px-3 m-3 
                              border-b-cyan-950 font-bold p-2 cursor-pointer" >
                            <button
                                onClick={() => handleDelete(product.id)}
                            >Delete
                            </button>
                        </div>
                        <div
                            className="bg-blue-400 px-3 m-3 
                              border-b-cyan-950 font-bold p-2 cursor-pointer"
                              onClick={() => navigate(`/AddProduct/${product.id}`)}
                        >Edit
                        </div>
                    </div>

                ))
            }
        </div>
    )
}
export default AdminPage;

