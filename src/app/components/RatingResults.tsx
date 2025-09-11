"use client";
import PlaceCard from "./placeCard";
import StarRating from "./rating";

type RatingResultsProps = {
   userInput?: string;
   rating: number;
   ratingData: Record<string, number>;
   ratingDataArray?: {
      name: string;
      image: string;
      places: Partial<{
         school: number;
         gym: number;
         hospital: number;
         pharmacy: number;
         spa: number;
         bank: number;
         atm: number;
         restuarant: number;
         bar: number;
         supermarket: number;
      }>[];
   }[];
};

export function RatingResults({
   userInput,
   rating,
   ratingData,
   ratingDataArray,
}: RatingResultsProps) {
   const [isModalOpen, setModalOpen] = React.useState(false);

   const handleShareClick = () => {
      setModalOpen(true);
   };

   const handleCloseModal = () => {
      setModalOpen(false);
   };

   const handleCopyLink = () => {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
   };

   return (
      <>
         <div className="text-center p-5">
            <h1 className="text-xl sm:text-2xl">
               Voila here’s what neighbourhood of {userInput} feels like
            </h1>
         </div>
         <div className="flex flex-col gap-12 justify-center items-center">
            <div className="flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center w-3/4 px-12">
               <div className="flex flex-col gap-1">
                  <p className="text-xl block">Neigborhood Rating</p>
                  <StarRating
                     maxRating={5}
                     size={48}
                     showRatingValue={false}
                     ratingValue={rating}
                  />
                  <span>Learn more</span>
               </div>

               <div className="flex flex-col gap-1">
                  <button
                     type="button"
                     onClick={handleShareClick}
                     className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-roofone-secondary px-2.5 py-1.5 text-sm font-semibold w-48 h-11 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                     Share this rating
                  </button>
                  <span>Help us improve this rating</span>
               </div>
            </div>

            <div className="flex flex-col gap-4 items-center justify-center">
               <div className="text-xl text-left">Neigborhood Overview </div>
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

         {isModalOpen && (
            <div className="modal">
               <div className="modal-content">
                  <span className="close" onClick={handleCloseModal}>
                     &times;
                  </span>
                  <h2>Share this rating</h2>
                  <button
                     onClick={() =>
                        window.open(
                           `https://twitter.com/share?url=${window.location.href}`,
                           "_blank"
                        )
                     }
                  >
                     Share on Twitter
                  </button>
                  <button
                     onClick={() =>
                        window.open(
                           `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`,
                           "_blank"
                        )
                     }
                  >
                     Share on LinkedIn
                  </button>
                  <button onClick={handleCopyLink}>Copy Link</button>
               </div>
            </div>
         )}
      </>
   );
}
