import { useState,useEffect } from "react";
import type { Product } from "../Type/product"
import { useParams } from "react-router-dom";
import { getProductData } from "../services/Api";

function AddProduct() {

    const [title, setProductTitle] = useState("");
    const [price, setProductPrice] = useState<number>(0);
    const [productAvailability, setProductAvailability] = useState(false);
    const [category, setCategory] = useState<Product["category"]>("Fruits");
    const [productDate, setProductDate] = useState<string>();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [img, setProductImage] = useState<string>("");


    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setProductImage(url);
        }
    }

    const handleSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();

        console.log({
            title,
            price,
            productAvailability,
            category,
            productDate,
            img
        });

        if (!title || !price || !productDate || !img) {
            alert("Please fill all fields");
            return;
        }


        const newProduct: Product = {
            id: Date.now(),
            title,
            price,
            productAvailability,
            category: category as Product["category"],
            productDate,
            img,
            rating, review,
            type: "custom",

        };
        setRating(0)
        setReview("")

        const existingProduct =
            JSON.parse(localStorage.getItem("products") || "[]");
        existingProduct.push(newProduct);

        localStorage.setItem(
            "products",
            JSON.stringify(existingProduct)
        );
        alert("Product Added Successfully");
    };


    const { id } = useParams();

    useEffect(() => {

    if (id) {
        const existingStoredProducts: Product[] = getProductData();
        const existingStoredProduct= existingStoredProducts.find((p) => p.id === Number(id))
        const products: Product[] = JSON.parse(localStorage.getItem("products") || "[]");
        const product = products.find((p) => p.id === Number(id))
        const findProduct = existingStoredProduct || product;

        if (findProduct) {
            setProductTitle(findProduct.title);
            setProductPrice(findProduct.price);
            setProductImage(findProduct.img);
            setCategory(findProduct.category);
            
        }
    }
},[id])


    return (
        <div className="flex justify-center mt-7 ">
            <form
                className="flex flex-col gap-5 w-95 
                border p-6 rounded shadow text-black">

                <div className="flex flex-col">
                    <label>Product Title</label>
                    <input
                        type="text" className="border p-2 rounded"
                        value={title}
                        onChange={(e) => setProductTitle(e.target.value)} />
                </div>

                <div className="flex flex-col">
                    <label>Product Price</label>
                    <input
                        type="number"
                        className="border p-2 rounded"
                        value={price}
                        onChange={(e) => setProductPrice(Number(e.target.value))} />
                </div>

                <div className="flex flex-col">
                    <label>Avilability</label>
                    <input
                        type="checkbox"
                        className="border p-2 rounded"
                        checked={productAvailability}
                        onChange={(e) => setProductAvailability(e.target.checked)} />
                </div>

                <div className="flex flex-col">
                    <label>Category:</label>

                    <div className="flex gap-4 mt-1 ml-10">
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="category"
                                value="Fruits"
                                checked={category === "Fruits"}
                                onChange={(e) => setCategory(e.target.value as Product["category"])}
                            />
                            Fruits
                        </label>
                    </div>

                    <div className="flex gap-4 mt-1 ml-10">
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="category"
                                value="Fashion"
                                checked={category === "Fashion"}
                                onChange={(e) => setCategory(e.target.value as Product["category"])} />
                            Fashion
                        </label>
                    </div>

                    <div className="flex gap-4 mt-1 ml-10">
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="category"
                                value="Grossary"
                                checked={category === "Grossary"}
                                onChange={(e) => setCategory(e.target.value as Product["category"])} />
                            Grossary
                        </label>
                    </div>

                    <div className="flex gap-4 mt-1 ml-10">
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="category"
                                value="Electronics"
                                checked={category === "Electronics"}
                                onChange={(e) => setCategory(e.target.value as Product["category"])} />
                            Electronics
                        </label>
                    </div>

                    <div className="flex gap-4 mt-1 ml-10">
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="category"
                                value="Shoe"
                                checked={category === "Shoe"}
                                onChange={(e) => setCategory(e.target.value as Product["category"])}
                            />
                            Shoe
                        </label>
                    </div>
                    <div className="flex gap-4 mt-1 ml-10 ">
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="category"
                                value="Beauty"
                                checked={category === "Beauty"}
                                onChange={(e) => setCategory(e.target.value as Product["category"])}
                            />
                            Beauty
                        </label>
                    </div>
                </div>

                <div className="flex flex-col ">
                    <label>Added date:</label>
                    <input
                        type="date"
                        value={productDate}
                        onChange={(e) => setProductDate(e.target.value)}
                        className="border p-2 rounded" />
                </div>
                <div className="flex flex-col">
                    <label>Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFile}
                        className="border p-2 rounded"
                    />
                </div>

                {img && <p>File uploaded: {img}</p>}
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 
                    rounded cursor-pointer"
                    onClick={handleSubmitForm}>
                    Add Product
                </button>
            </form>


        </div>
    )
}
export default AddProduct;