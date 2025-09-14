"use client";
import { useState } from "react";
import Search from "./search";
import { RatingResults } from "./RatingResults";
import { Loading } from "./Loading";
import { PLACES } from "@/lib/places";
import { Place } from "@/lib/helpers";
import { PlacesApi } from "@/lib/placesApi";

const copy = {
   heroMain: "Discover the vibe before you move",
   heroSubCopy:
      "Find out what an area is like, what amenities are available and what people think of the area.",
};

export function NeigbourhoodRatingHero() {
   const [userInput, setUserInput] = useState<string>("");
   const [isLoading, setIsLoading] = useState(false);
   const [rating, setRating] = useState<number | null>(null);
   const [ratingData, setRatingData] = useState<Record<string, number>>({});

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
      console.log("User input:", userInput);
      console.log("Rating results", ratingData);
      console.log("Rating score", rating);
      console.log("RatingDataArray", ratingDataArray);
      async function getPlaceDetails(placeId: string) {
         setIsLoading(true);
         try {
            const res = await PlacesApi.get(
               `places/${placeId}?fields=location,formattedAddress`
            );
            const data = await res.json();
            if (!res.ok) throw new Error("Failed to get place details");
            //console.log("Received place details:", data);

            const RatingInfo = await calculatePlaceRating(data.location);

            setRating(RatingInfo.starRating);
            setRatingData(RatingInfo.placeInfo);
            setIsLoading(false);
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

      console.log("Ratings", starRating);

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

      return {
         name: place.name,
         score: data.places?.length * place.rank || 0,
         count: data.places?.length,
      };
   }

   return (
      <>
         {isLoading ? (
            <Loading />
         ) : (
            <>
               <div className="bg-roofone-green-bg/30 h-screen flex flex-col items-center justify-center">
                  <div className="text-center">
                     <div className="px-12 lg:px-64">
                        <h1 className="text-wrap text-3xl font-semibold tracking-tight text-gray-900 md:text-6xl">
                           {copy.heroMain}
                        </h1>
                     </div>
                     <p className="mt-6 px-48 text-pretty text-md font-medium text-gray-500 md:mt-8 md:text-xl/8">
                        {copy.heroSubCopy}
                     </p>
                     {/*Autocomplete search input */}
                     <Search
                        userInput={userInput}
                        setUserInput={setUserInput}
                        handleGetSelectedPlaceRating={handleCalculateRating}
                     />
                  </div>
               </div>

               {rating !== null && (
                  <div ref={(node) => node?.scrollIntoView()}>
                     <RatingResults
                        userInput={userInput}
                        rating={rating}
                        ratingData={ratingData}
                        ratingDataArray={ratingDataArray}
                     />
                  </div>
               )}
            </>
         )}
      </>
   );
}
