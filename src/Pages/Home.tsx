

import { getProductData } from '../services/Api';
import ProductCard from '../components/ProductCard';
import { useState, useEffect } from 'react';
import '../Css/Home.css';

type Product = {
  id: number;
  title: string;
  price: number;
  img?: string;
  category: {
    id: number;
    name: string;
  };
};

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    getProductData()
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

  const categories: string[] = [
    "All",
    ...Array.from(new Set(products.map(p => p.category.name)))
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(p => p.category.name === selectedCategory);

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

      <div className="card">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
    </div>
  );
}

export default Home;