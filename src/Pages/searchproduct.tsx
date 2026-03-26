import { getProductData } from "../services/Api";
import { Link } from "react-router-dom";


function SearchProduct() {

    // const products: Product[] = getProductData();
    // const search = useSearchStore((state) => state.search);

    // const filteredSearchProducts =
    //     search.trim() === ""
    //         ? []
    //         : products.filter((p) =>
    //             p.title.toLowerCase().includes(search.toLowerCase())
    //         );

    return (
        <div className="grid grid-cols-4 gap-6">

            {/* {filteredSearchProducts.length === 0 && search !== "" && (
                <h2 className="text-red-700">No product found</h2>
            )}

            {filteredSearchProducts.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`}>
                    <div className="border p-4 rounded">
                        <img src={p.img} />
                        <h3>{p.title}</h3>
                        <h3>₹{p.price}</h3>
                    </div>
                </Link>
            ))} */}
        </div>
    );
}


export default SearchProduct;