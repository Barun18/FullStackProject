import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function BuyPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<any>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetails = async () => {
            const res = await fetch(`http://localhost:5000/buy/${id}`);
            const product = await res.json();
            setProduct(product);
        }
        if (id) {
            fetchDetails();
        }
    }, [id]);

    return (
        <div>

            {product && (
                <h2 key={product.id}>
                    <img src={product.img} alt={product.title} width={200} />
                    {product.title}
                    <p>
                        <button
                            className="bg-blue-500 px-2 py-1 mt-2"
                            onClick={() => navigate(`/payment/${id}`)}
                        >Buy at ₹{product.price}
                        </button>
                    </p>
                </h2>
            )

            }

        </div>
    )

}
export default BuyPage;