import { useParams } from "react-router-dom";
import { getSingleProduct } from '../services/Api';
import "../Css/ProductDetails.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductDetails() {

   const { id } = useParams();
   const [item, setItem] = useState<any>(null);

   const [review, setReview] = useState<any[]>([]);
   const [name, setName] = useState("");
   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState("");
   //const [image, setImage] = useState<string | undefined>(undefined);


   // const productReviews = reviews.filter(
   //    (r) => r.productId === Number(id))

   useEffect(() => {
      if (!id) return;

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
   }, [id])

   const handleSubmit = async () => {
      try {
         const res = await fetch("http://localhost:5000/review",{
            method:"POST",
            headers: {
               "content-type":"application/json",
            },
            body: JSON.stringify({
               productId: Number(id),
               userId: 18,
               rating: Number(rating), 
               comment,
            }),
         });
         const text = await res.text();
         console.log("Raw Response:", text);
         let newReview;
         try{
            newReview = JSON.parse(text);

         }catch{
            console.error("Backend did not return JSON");
            return;
         }

         setReview((prev) =>[...prev, newReview]);

         setName("");
         setRating(0);
         setComment("");

      }catch(err){
         console.log(err);
      }
   };

   // const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
   //    const file = e.target.files?.[0];
   //    if (!file) return;
   //    const reader = new FileReader();
   //    reader.onloadend = () => {
   //       setImage(reader.result as string);
   //    };
   //    reader.readAsDataURL(file);
   // };

   if (!item) return <div>Loading...</div>

   return (
      <div>

         <div className="product-img flex items-start gap-6">
            <div>
               <img
                  src={item.img} alt={item.title} width={200} />
               <h2>{item.title}</h2>
               <h2>₹{item.price}</h2>

               {/* <button
                  className="cardAbout"
                  onClick={() => addToCart(item)}>
                  Add to Cart
               </button> */}

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
            {/* <input
               className="bg-emerald-600 px-5 bold"
               type="file"
               accept="image/*"
               onChange={handleImage} /> */}

            <button
               className="bg-green-900 bold m-1.5 px-3"
               onClick={handleSubmit}>
               Submit Review
            </button>

         </div>

         {
            review.map((r) => (
               <div
                  className="text-red-700 border-b pb-3 mb-3"
                  key={r.id}>
                  
                  <p>Rating:{r.rating}</p>
                  <p>Review:{r.comment}</p>
                  {/* {r.image && (
                     <img src={r.image} width={50} alt="review" />
                  )} */}

               </div>
            ))
         }

         {/* <img src={item.img} width="200" />
         <h2>{item.title}</h2>
         <p>Price:{item.price}</p> */}


         {/* <div>
            {
               Object.entries(item.details as Record<string, any>).map(([key, value]) => (
                  <p key={key}>
                     {key}:{value}
                  </p>
               ))
            }
         </div> */}

      </div>)
}

export default ProductDetails;