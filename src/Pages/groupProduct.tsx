import { getProductData } from "../services/Api";
import { useState } from "react";
import type { Product } from '../Type/product'
import { Link } from "react-router-dom";


function GroupProduct() {

    const products: Product[] = getProductData();
    const berryPoducts = products.filter((p) => p.group === "Berry");
    const seasons = [...new Set(berryPoducts.map((p) => p.season))];
    const [selectSeason, setSelectSeason] = useState<string>("All");
    const filteredProducts = selectSeason === "All"
        ? berryPoducts
        : berryPoducts.filter((p) => p.season === selectSeason)

    
    return (
        <div>
            <button
                className={`m-6 gap-1.5 px-4 py-2 rounded text-orange-500 font-bold 
                        ${selectSeason === "All" ?
                        "bg-blue-700 text-white" : "bg-gray-300"}
                        `}
                onClick={() => setSelectSeason("All")}>
                All
            </button>
            {seasons.map((s) => (
                <button
                    className={`m-6 gap-1.5 px-4 py-2 rounded text-orange-500 font-bold
                        ${selectSeason === s ?
                            "bg-blue-700 text-white" : "bg-gray-300"}
                        `}
                    key={s}
                    onClick={() => setSelectSeason(s ?? "")}>
                    {s}
                </button>
            ))}
            <div className="flex">
                {filteredProducts.map((p) => (
                    <Link
                        key={p.id} to={`/product/${p.id}`}>
                        <div className="text-black font-bold">
                            <img src={p.img} width={120} />
                            <h3>{p.title}</h3>
                            <p>{p.season}</p>
                            <p>₹{p.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )}

export default GroupProduct;