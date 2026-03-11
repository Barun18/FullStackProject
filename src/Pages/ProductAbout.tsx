import { useParams } from "react-router-dom";
import { getProductData } from '../services/Api';
import useCartStore from "../store/useCartStore";
import useReviewStore from "../store/reviewStore";
import "../Css/ProductAbout.css"
import { useState } from "react";



function ProductAbout() {


  const { id } = useParams();
  const item = getProductData();

  const cartItem = item.find((i) => i.id.toString() === id)
  if (!cartItem) return <h2>No product found!!! </h2>;
  const addToCart = useCartStore((state) => state.addToCart)


  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState<string | undefined>(undefined);

  const addReview = useReviewStore((state) => state.addReview);
  const reviews = useReviewStore((state) => state.reviews);

  const productReviews = reviews.filter(
    (r) => r.productId === Number(id))

  const handleSubmit = () => {

    addReview({
      id: Date.now(),
      productId: Number(id),
      name, rating, comment,
      image,
    });

    setName("")
    setRating(0)
    setComment("")
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };


  return (
    <div>
      <div className="product-img flex items-start gap-6">
        <div>
          <img
            src={cartItem.img} alt={cartItem.title} width={200} />
          <h2>{cartItem.title}</h2>
          <h2>₹{cartItem.price}</h2>
          <button
            className="cardAbout"
            onClick={() => addToCart(cartItem)}>
            Add to Cart
          </button>
        </div>
        <div className="product-About">
          Highlight
          <table className="w-full border border-gray-400">
            <tbody>
              {cartItem.details ? (
                Object.entries(cartItem.details).map(([key, value]) => (
                  <tr key={key}>
                    <td className="border p-2 font-semibold">{key}</td>
                    <td className="border p-2 ">{value}</td>
                  </tr>
                ))

              ) : (
                <tr>
                  <td className="border p-2" colSpan={2}>
                    No details available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>


      <div className="review-form flex gap-4">
        <input
          className="bg-emerald-600 px-5 bold"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="bg-emerald-600 px-5"
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <textarea
          className="bg-emerald-600 px-5 bold"
          placeholder="Write your review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <input
          className="bg-emerald-600 px-5 bold"
          type="file"
          accept="image/*"
          onChange={handleImage} />

        <button
          className="bg-green-900 bold m-1.5 px-3"
          onClick={handleSubmit}>
          Submit Review
        </button>

      </div>


      {
        productReviews.map((r) => (
          <div
            className="text-red-700 border-b pb-3 mb-3"
            key={r.id}>
            <p>Name:{r.name}</p>
            <p>Rating:{r.rating}</p>
            <p>Review:{r.comment}</p>
            {r.image && (
              <img src={r.image} width={50} alt="review" />
            )}

          </div>
        ))
      }
    </div>
  )

}

export default ProductAbout;