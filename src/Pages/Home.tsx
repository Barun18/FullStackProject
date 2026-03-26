
import { getProductData } from '../services/Api';
import ProductCard from '../components/ProductCard';
import { useState, useEffect } from 'react';
import '../Css/Home.css'
import { data, Link } from 'react-router-dom';

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

    return (
        <div>
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
                    <ProductCard key={product.id} product={product} />
                ))}

            </div>
        </div>
    )

}
export default Home;