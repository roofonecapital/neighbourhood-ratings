"use client";
import { Chatbot } from "./chatbot";
import { NeighborhoodAIOverview } from "./neighbourhoodAI";
import PlaceCard from "./placeCard";
import StarRating from "./rating";
import { RatingResultsProps } from "@/lib/helpers";

export function RatingResults({
   userLocationInput,
   rating,
   ratingDataArray,
}: RatingResultsProps) {
   return (
      <>
         <div className="text-center p-5">
            <h1 className="text-xl sm:text-2xl">
               This is the vibe around {userLocationInput} currently 😎.
            </h1>
         </div>
         <div className="flex flex-col gap-12 justify-center items-center">
            <div className="flex flex-col sm:flex-row md:gap-96 justify-center items-center md:justify-start sm:justify-between md:items-start sm:items-center w-3/4 px-12">
               <div className="flex flex-col gap-1 justify-center items-center">
                  <p className="text-xl block">Neigborhood Rating</p>
                  <StarRating
                     maxRating={5}
                     size={48}
                     showRatingValue={false}
                     ratingValue={rating}
                  />
               </div>

               <div className="flex flex-col gap-1">
                  <a
                     href="mailto:olaitanodulaja@gmail.com"
                     className="inline-flex items-center justify-center md:justify-end gap-x-1.5 px-2.5 py-1.5 text-sm font-semibold w-48 h-11 text-indigo-500"
                  >
                     Help improve this rating
                  </a>
               </div>
            </div>

            <div className="flex flex-col gap-4 items-center justify-center">
               <div className="text-md md:text-xl text-center px-12 md:px-0 mt-[-48px] md:mt-0">
                  Neigborhood overview of amenities within a 1,500m radius
               </div>
               <div className="flex flex-col lg:flex-row gap-4 lg:px-56">
                  {ratingDataArray?.map((ratingDataArray) => (
                     <PlaceCard
                        name={ratingDataArray.name}
                        image={ratingDataArray.image}
                        places={ratingDataArray.places}
                        key={ratingDataArray.name}
                     />
                  ))}
               </div>
            </div>
         </div>
         <NeighborhoodAIOverview />
         <Chatbot />
      </>
   );
}
