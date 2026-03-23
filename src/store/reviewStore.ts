import { create } from 'zustand';
import type { Review } from '../Type/Review';
import { persist } from "zustand/middleware";

type ReviewState = {

    reviews: Review[];
    addReview: (review: Review) => void;
    getProductReviews: (productId: number) => Review[];
}

const useReviewStore = create<ReviewState>()(
    persist(
        (set, get) => ({

            reviews: [],

            addReview: (review) => set((state) => ({
                reviews: [...state.reviews, review],
            })),
            getProductReviews: (productId) => {
                return get().reviews.filter((r) => r.productId === productId)
            },

        }),
     {
            name: "review-storage",
        }
    )); 

export default useReviewStore;