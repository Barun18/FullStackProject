
import { getProductData } from '../services/Api';
import ProductCard from '../components/ProductCard';
import { useState } from 'react';
import '../Css/Home.css'
import type { Product } from '../Type/product';
import { Link } from 'react-router-dom';



function Home() {

    const products: Product[] = getProductData();
    const [selectedCategory, setSelectedCategory] = useState("All")
    const categories: string[] = [
        "All",
        ...Array.from(new Set(products.map(p => p.category)))];

    const filteredProducts = selectedCategory === "All"
        ? products
        : products.filter(p => p.category === selectedCategory);

    const [selectedGroup, setSelectedGroup] = useState("");
        if ( selectedGroup === "fruit"){
            console.log("Fruit selected");
        }

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
            <div>
                <Link to="group/Berry">
                    <button onClick={() => setSelectedGroup("Berry")}
                        className="bg-blue-700 text-amber-50 px-4 py-2 rounded">
                        Berry Fruits Group
                    </button>
                </Link>
            </div>
            <div>

            </div>
            <div className="card">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}

            </div>

        </div>
    )

}
export default Home;