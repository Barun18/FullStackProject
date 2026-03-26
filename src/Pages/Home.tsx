
import { getProductData } from '../services/Api';
import ProductCard from '../components/ProductCard';
import { useState, useEffect } from 'react';
import '../Css/Home.css'
import { data, Link } from 'react-router-dom';
import CartItem from '../components/CartItem';

type Product = {
    id: number;
    title: string;
    price: number;
    img?: string;
    type?: string;
    rating?: number;
    reviewCount?: number;

    category: {
        id: number;
        name: string;
    };
};


function Home() {

    const [products, setProducts] = useState<Product[]>([])
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [cart, setCart] = useState<{ [key: number]: number }>({});

    useEffect(() => {
        getProductData().then(data => setProducts(data))
            .catch(err => console.log(err));
    }, [])

    const categories: string[] = [
        "All",
        ...Array.from(new Set(products.map(p => p.category.name)))
    ];

    const filteredProducts =
        selectedCategory === "All" ?
            products : products.filter(p =>
                p.category.name === selectedCategory);


    const handleAdd = (product: Product) => {
        setCart(prev => ({
            ...prev,
            [product.id]: (prev[product.id] || 0) + 1
        }));
    };

    const handleIncrease = (id: number) => {
        setCart(prev => ({
            ...prev,
            [id]: prev[id] + 1
        }));
    };

    const handleDecrease = (id: number) => {
        setCart(prev => {
            const updated = { ...prev };
            if (updated[id] === 1) {
                delete updated[id];
            } else {
                updated[id] -= 1;
            }
            return updated;
        });
    };

    const cartItems = products.filter(p => cart[p.id]);
    
    return (
        <div>
            <CartItem items={cartItems} cart={cart} />
            <div className="flex gap-3 mb-4">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className="px-3 py-1 border rounded bg-blue-900"
                    >
                        {cat}

                    </button>
                ))}
            </div>
            {/* <div>
                <Link to="group/Berry">
                    <button onClick={() => setSelectedGroup("Berry")}
                        className="bg-blue-700 text-amber-50 px-4 py-2 rounded">
                        Berry Fruits Group
                    </button>
                </Link>
            </div> */}

            <div className="card">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id}
                        product={product}
                        cartQty={cart[product.id]}
                        onAdd={handleAdd}
                        onIncrease={handleIncrease}
                        onDecrease={handleDecrease}
                    />
                ))}

            </div>
        </div>
    )

}
export default Home;