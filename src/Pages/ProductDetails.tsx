import { useRef } from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct } from '../services/Api';
import "../Css/ProductDetails.css"
import { useEffect, useState } from "react";

type Props = {
   user: any;
}

function ProductDetails({ user }: Props) {

   const { id } = useParams();
   const hasAlerted = useRef(false);
   const [item, setItem] = useState<any>(null);
   const [review, setReview] = useState<any[]>([]);
   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState("");
   const [file, setFile] = useState<File | null>(null);


   useEffect(() => {
      if (!user && !hasAlerted.current ) {
         alert("Please login first");
         hasAlerted.current = true;
      }
      const fetchProduct = async () => {
         try {
            const data = await getSingleProduct(Number(id));
            setItem(data);

            const res = await fetch(`http://localhost:5000/reviews/${id}`);
            console.log(res);
            const reviewData = await res.json();
            setReview(reviewData);

         } catch (err) {
            console.error("Error fetching product:", err);
         }
      };
      if (id) {
         fetchProduct();
      }
   }, [id,user])

   const handleSubmit = async () => {
      try {
         if (!user) {
            alert("please login first");
            return;
         }
         const formData = new FormData();
         formData.append("productId", String(id))
         formData.append("rating", rating.toString());
         formData.append("comment", comment);
         if (file) {
            formData.append("image", file);
         }

         const res = await fetch("http://localhost:5000/review", {
            method: "POST",
            credentials: "include",
            body: formData,
         });
         const data = await res.json();

         setReview((prev) => [...prev, data]);

         setRating(0);
         setComment("");
         setFile(null);

      } catch (err) {
         console.log(err);
      }
   };


   if (!item) return <div>Loading...</div>

   return (
      <div>

         <div className="product-img flex items-start gap-6">
            <div>
               <img
                  src={item.img} alt={item.title} width={200} />
               <h2>{item.title}</h2>
               <h2>₹{item.price}</h2>

            </div>
            <div className="product-details">
               Highlight
               <table className="w-full border border-gray-400">
                  <tbody>
                     {item.details ? (
                        Object.entries(item.details as Record<string, any>).map(([key, value]) => (
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
               onChange={(e) => {
                  if (e.target.files) {
                     setFile(e.target.files[0])
                  }
               }
               } />

            <button
               className="bg-green-900 bold m-1.5 px-3"
               onClick={handleSubmit}>
               Submit Review
            </button>

         </div>

         {
            review.map((r) => (
               <div
                  className="text-orange-800 border-b pb-3 mb-3 bg-sky-100 pl-10"
                  key={r.id}>

                  <p>Rating:{r.rating}</p>
                  <p>Review:{r.comment}</p>
                  {r.image && (
                     <img src={r.image} width={50} alt="review" />
                  )}
               </div>
            ))
         }

      </div>)
}

export default ProductDetails;