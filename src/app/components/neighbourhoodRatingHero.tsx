"use client";
import { useState } from "react";
import Search from "./search";
import { RatingResults } from "./RatingResults";
import { Loading } from "./Loading";
import { PLACES } from "@/lib/places";
import { Place } from "@/lib/helpers";
import { PlacesApi } from "@/lib/placesApi";
import { NeighborhoodAIOverview } from "./neighbourhoodAI";
//import { Chatbot } from "./chatbot";
import { QuickQuestion } from "@/lib/helpers";

const copy = {
   heroMain: "Discover the vibe before you move.",
   heroSubCopy:
      "Find out what an area is like, what amenities are available and what people think of the area.",
};

// export const quickQuestions: QuickQuestion[] = [
//    { text: "What schools are nearby?" },
//    { text: "What gyms are nearby?" },
//    { text: "Tell me about transport links" },
//    { text: "What restaurants are in the area?" },
//    { text: "How safe is this neighborhood?" },
//    { text: "What healthcare facilities are close?" },
// ];

export function NeigbourhoodRatingHero() {
   const [userLocationInput, setuserLocationInput] = useState<string>("");
   const [isLoading, setIsLoading] = useState(false);
   const [rating, setRating] = useState<number | null>(null);
   const [ratingData, setRatingData] = useState<Record<string, number>>({});
   const [aiOverview, setAiOverview] = useState<string>("");

   const ratingDataArray = [
      {
         name: "School",
         image: "/school-rating.jpg",
         places: [{ school: ratingData.school }],
      },
      {
         name: "Health care",
         image: "/school-rating.jpg",
         places: [
            { gym: ratingData.gym },
            { hostpital: ratingData.hospital },
            { pharmacy: ratingData.pharmacy },
            { spa: ratingData.spa },
         ],
      },
      {
         name: "Banks",
         image: "/school-rating.jpg",
         places: [{ bank: ratingData.bank }, { atm: ratingData.atm }],
      },
      {
         name: "Food",
         image: "/school-rating.jpg",
         places: [
            { restaurant: ratingData.restaurant },
            { bar: ratingData.bar },
         ],
      },
      {
         name: "Shopping",
         image: "/school-rating.jpg",
         places: [{ supermarket: ratingData.supermarket }],
      },
   ];

   const handleCalculateRating = (placeId: string) => {
      async function getPlaceDetails(placeId: string) {
         setIsLoading(true);
         try {
            const res = await PlacesApi.get(
               `places/${placeId}?fields=location,formattedAddress`
            );
            const data = await res.json();
            if (!res.ok) throw new Error("Failed to get place details");

            const RatingInfo = await calculatePlaceRating(data.location);
            generateAIOverview(RatingInfo.starRating, RatingInfo.placeInfo);
            setRating(RatingInfo.starRating);
            setRatingData(RatingInfo.placeInfo);
         } catch (error) {
            setIsLoading(false);
            console.log(error);
         }
      }

      getPlaceDetails(placeId);
   };

   const calculatePlaceRating = async (location: {
      latitude: number;
      longitude: number;
   }) => {
      const { latitude, longitude } = location;
      const getPlaceInfo = await Promise.all(
         PLACES.map((place) => {
            return calculatePlaceScoreAndCount(place, latitude, longitude);
         })
      );

      const placeInfo = getPlaceInfo.reduce<Record<string, number>>(
         (acc, place) => {
            acc[place.name] = place.count;
            return acc;
         },
         {}
      );
      const placesScore = getPlaceInfo.reduce((acc, place) => {
         return acc + place.score;
      }, 0);
      const maxScore = PLACES.reduce((acc, place) => {
         return acc + place.max * place.rank;
      }, 0);
      const ratingScore = (placesScore / maxScore) * 100;
      const starRating = ratingScore / 20;

      return { starRating, placeInfo };
   };

   async function calculatePlaceScoreAndCount(
      place: Place,
      lat: number,
      lng: number
   ) {
      const queryBody = {
         includedTypes: place.name,
         maxResultCount: place.max,
         locationRestriction: {
            circle: {
               center: {
                  latitude: lat,
                  longitude: lng,
               },
               radius: 1500.0,
            },
         },
      };

      const res = await PlacesApi.post("places:searchNearby", queryBody, [
         "places.primaryType",
      ]);
      const data = await res.json();
      console.log("Places API response data:", data);

      return {
         name: place.name,
         score: data.places?.length * place.rank || 0,
         count: data.places?.length,
      };
   }

   const generateAIOverview = async (
      rating: number,
      placeInfo: Record<string, number>
   ) => {
      // Example prompt
      const prompt = `Provide a detailed overview and reasoning of the neighborhood around ${userLocationInput}. The area has a rating of ${rating} (briefly justify this based on the place amenities available) stars based on the following number of amenities within a 1500km radius: ${JSON.stringify(
         placeInfo
      )}. Include information about which schools, healthcare, banks, food, and shopping options (include names). Highlight any notable features or characteristics of the area. Use a friendly and informative tone. Also, consider including information from local reviews (cite the source in parenthesis) and social media to provide a well-rounded perspective. Make the overview engaging and useful for someone considering moving to this neighborhood. Keep it concise, around 50-100 words maximum. Include any relevant statistics or data points that can help illustrate the quality of life in the area and crime levels (include the source for crime rate).`;

      try {
         const res = await fetch("/api/generate", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }),
         });

         const data = await res.json();
         if (!res.ok)
            throw new Error(data.error || "Failed to generate overview");
         setAiOverview(data.text || "No overview generated");
         setIsLoading(false);
      } catch (error) {
         return "Unable to generate overview at this time.";
      }
   };

   /* AI chatbot api logic 
   - 
   */

   return (
      <>
         {isLoading ? (
            <Loading />
         ) : (
            <>
               <div className="bg-roofone-green-bg/30 h-screen flex flex-col items-center justify-center">
                  <div className="text-center">
                     <div className="px-12 lg:px-64">
                        <h1 className="text-wrap text-2xl font-semibold tracking-tight text-gray-900 md:text-6xl">
                           {copy.heroMain}
                        </h1>
                     </div>
                     <p className="mt-2 px-12 md:px-48 text-pretty text-sm font-medium text-gray-500 md:mt-8 md:text-xl/8">
                        {copy.heroSubCopy}
                     </p>
                     {/*Autocomplete search input */}
                     <Search
                        userLocationInput={userLocationInput}
                        setuserLocationInput={setuserLocationInput}
                        handleGetSelectedPlaceRating={handleCalculateRating}
                     />
                  </div>
               </div>

               {rating !== null && (
                  <div ref={(node) => node?.scrollIntoView()}>
                     <RatingResults
                        userLocationInput={userLocationInput}
                        rating={rating}
                        ratingDataArray={ratingDataArray}
                     />
                     <NeighborhoodAIOverview
                        generatedSummary={aiOverview}
                        // quickQuestions={quickQuestions}
                     />
                     {/* <Chatbot /> */}
                  </div>
               )}
            </>
         )}
      </>
   );
}
